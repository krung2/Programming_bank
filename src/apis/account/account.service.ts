import { ConflictException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { sha512 } from 'js-sha512';
import { AccountConst } from 'src/global/constants/account.const';
import { BankEndPoint } from 'src/global/constants/bankEndPoint.const';
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
        money: 0,
        password: sha512(addAccountDto.password),
        user,
      });

      await this.myAccountRepository.save({
        user,
        accountId,
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

  public async findMyAccounts(user: User): Promise<Account[]> {

    const myAccount: MyAccount[] = await this.myAccountRepository.getMyAccountByUserId(user.id);
    const myAccountList: Account[] = [];

    myAccount.map(async ({ accountId }: MyAccount) => {
      myAccountList.push(await this.findAccountById(accountId));
    })

    return myAccountList;
  }

  public async findAccountById(accountId: string): Promise<Account> {
    try {
      const { data }: { data: BaseResponse<Account> } = await customAxiosUtil.get(bankCheckUtil(accountId, ActionCheckEnum.GET))
      return data.data;
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
}
