import { ConflictException, ForbiddenException, HttpException, Injectable, Logger } from '@nestjs/common';
import { sha512 } from 'js-sha512';
import { AccountConst } from 'src/global/constants/account.const';
import { BankAccountEndPoint, BankEndPoint } from 'src/global/constants/bankEndPoint.const';
import { accountPwPattern } from 'src/global/patterns/accountPattern';
import { isDiffrentUtil } from 'src/global/utils/Comparison.util';
import { customAxiosUtil } from 'src/global/utils/CustomAxiosUtil';
import { randomNum0To9 } from 'src/global/utils/RandomNum.util';
import { validationData, validationPattern } from 'src/global/utils/validationData.util';
import User from 'src/apis/user/entities/user.entity';
import { Connection } from 'typeorm';
import AddAccountDto from './dto/addAccount.dto';
import Account from './entities/account.entity';
import AccountRepository from './repositories/account.repository';
import MyAccountRepository from './repositories/myAccount.repository';
import MyAccount from './entities/myAccount.entity';
import { bankCheckUtil } from 'src/global/utils/BankCheckUtil';
import { ActionCheckEnum } from 'src/global/enums/actionCheck.enum';
import BaseResponse from 'src/global/response/base.response';
import { IAccounMoney } from 'src/global/interfaces/IAccountMoney';
import { AddMyAccountDto } from './dto/addMyaccount.dto';
import { FindMyAllAccountDto } from './responses/findMyAllAccountRes.dto';

@Injectable()
export class AccountService {

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly myAccountRepository: MyAccountRepository,
    private readonly connection: Connection,
  ) { }

  public async addAccount(user: User, addAccountDto: AddAccountDto): Promise<Account> {

    if (validationPattern(accountPwPattern, addAccountDto.password)) {

      throw new ForbiddenException('비밀번호는 4자리여야 합니다');
    }

    const accountArr: number[] = new Array();

    for (let i = 0; i < 9; i++) {

      accountArr.push(randomNum0To9());
    }

    const accountId: string = AccountConst.JB + accountArr.join('');

    try {

      await this.isValidAccount(accountId);

      const saveAccount: Account = await this.accountRepository.save({
        accountId,
        money: 50000,
        password: sha512(addAccountDto.password),
        user,
      });

      await this.myAccountRepository.save({
        user,
        accountId,
        accountName: addAccountDto.accountName,
      })

      return saveAccount;
    } catch (err) {

      if (!(err instanceof HttpException)) {

        throw err;
      }

      return await this.addAccount(user, addAccountDto);
    }
  }

  private async isValidAccount(accountId: string): Promise<void> {

    const account: Account | undefined = await this.accountRepository.findAccountByAccountId(accountId);

    if (isDiffrentUtil(account, undefined)) {

      throw new ConflictException('중복된 계좌번호입니다');
    }
  }

  public async getAllBankMoney(): Promise<number> {

    const bankMoneyStr: IAccounMoney[] = await this.accountRepository.getAllBankMoney();
    let bankMoney: number = 0;

    bankMoneyStr.map(({ money }) => bankMoney += +money);

    return bankMoney;
  }

  public async getAllBankAccount(phone: string): Promise<FindMyAllAccountDto[]> {

    const accountArr: FindMyAllAccountDto[] = [];

    for (const value of Object.values(BankAccountEndPoint)) {
      try {
        const { data }: { data: BaseResponse<any> } = await customAxiosUtil.get(value + phone);

        await data.data.map((d: any) => {
          if (value === BankAccountEndPoint.JB) accountArr.push(new FindMyAllAccountDto(d.accountId, d.user.phone, d.user.name));
          if (value === BankAccountEndPoint.HY) accountArr.push(new FindMyAllAccountDto(d.account, d.user.phone, d.user.name));
        });
      } catch (err) {
        Logger.log(value + '의 계좌가 없습니다')
      }
    }

    return accountArr;
  }

  public async findAccountByAccountId(accountId: string): Promise<Account> {

    const account: Account | undefined = await this.accountRepository.findAccountByAccountId(accountId);

    if (validationData(account)) {

      throw new ForbiddenException('등록되지 않은 계좌 번호 입니다');
    }

    return account;
  }

  public async findAccountByAccountIdWithPw(accountId: string, accountPw: string): Promise<Account> {

    const account: Account | undefined = await this.accountRepository.findAccountByAccountIdWithPw(accountId, accountPw);

    if (validationData(account)) {

      throw new ForbiddenException('등록되지 않은 계좌 번호, 혹은 비밀번호 입니다');
    }

    return account;
  }

  public async findAccountByPhone(userPhone: string): Promise<Account[]> {

    return this.accountRepository.findAccountByPhone(userPhone);
  }

  public async findMyAccounts(user: User): Promise<FindMyAllAccountDto[]> {

    const myAccount: MyAccount[] = await this.myAccountRepository.getMyAccountByUserId(user.phone);
    const myAccountList: FindMyAllAccountDto[] = [];

    await Promise.all(
      myAccount.map(async ({ accountId }: MyAccount) => {
        myAccountList.push(await this.findAccountById(accountId));
      })
    )

    return myAccountList;
  }

  public async findAccountById(accountId: string): Promise<FindMyAllAccountDto> {
    try {
      const { data }: { data: BaseResponse<any> } = await customAxiosUtil.get(bankCheckUtil(accountId, ActionCheckEnum.GET) + accountId);
      const endpoint = bankCheckUtil(accountId, ActionCheckEnum.GET);
      if (endpoint === BankEndPoint.GJB) return new FindMyAllAccountDto(data.data.accountId, data.data.user.phone, data.data.user.name, data.data.money);
      if (endpoint === BankEndPoint.GHY) return new FindMyAllAccountDto(data.data.account, data.data.user.phone, data.data.user.name, data.data.money);
    } catch (e) {
      console.log(e);
    }
  }

  public async receiveMoney(account: Account, money: number): Promise<Account> {

    const changeMoney: number = Number(account.money) + money;
    account.money = changeMoney;

    await this.connection.transaction('SERIALIZABLE', async manager => {

      account = await this.accountRepository.changeMoney(manager, account)
    });

    return account;
  }

  public async sendMoney(bankEndPoint: BankEndPoint, account: Account, receiveAccountId: string, money: number): Promise<Account> {
    await this.connection.transaction('SERIALIZABLE', async manager => {

      account = await this.accountRepository.changeMoney(manager, account)

      await customAxiosUtil.post(bankEndPoint, {
        sendAccountId: account.accountId,
        receiveAccountId,
        money,
      });
    });

    return account
  }

  public async addMyAccount(user: User, addMyAccountDto: AddMyAccountDto): Promise<MyAccount[]> {

    for (const account of addMyAccountDto.accounts) {

      const createMyAccount: MyAccount = this.myAccountRepository.create(account);
      createMyAccount.user = user;
      await this.myAccountRepository.save(createMyAccount);
    }

    return this.myAccountRepository.getMyAccountByUserId(user.phone);
  }
}
