import { ConflictException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { sha512 } from 'js-sha512';
import { AccountConst } from 'src/global/constants/account.const';
import { BankEndPoint } from 'src/global/constants/bankEndPoint.const';
import { accountPwPattern } from 'src/global/patterns/accountPattern';
import { isDiffrentUtil } from 'src/global/utils/Comparison.util';
import { customAxiosUtil } from 'src/global/utils/CustomAxiosUtil';
import { randomNum0To9 } from 'src/global/utils/RandomNum.util';
import { validationData, validationPattern } from 'src/global/utils/validationData.util';
import User from 'src/user/entities/user.entity';
import { Connection } from 'typeorm';
import AddAccountDto from './dto/addAccount.dto';
import Account from './entities/account.entity';
import AccountRepository from './repositories/account.repository';

@Injectable()
export class AccountService {

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly connection: Connection,
  ) { }

  public async addAccount(user: User, addAccountDto: AddAccountDto): Promise<Account> {

    if (validationPattern(accountPwPattern, addAccountDto.password)) {

      throw new ForbiddenException('비밀번호는 4자리여야 합니다');
    }

    const accountArr: number[] = new Array();

    for (let i = 0; i < 10; i++) {

      accountArr.push(randomNum0To9());
    }

    const accountId: string = AccountConst.JB + accountArr.join('');

    try {

      await this.isValidAccount(accountId);

      return this.accountRepository.save({
        accountId,
        money: 0,
        password: sha512(addAccountDto.password),
        user,
      });
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

  public async findAccountByPhone(userPhone: string): Promise<Account[]> {

    return this.accountRepository.findAccountByPhone(userPhone);
  }

  public async findMyAccounts(user: User): Promise<Account[]> {

    return this.accountRepository.findMyAccounts(user.phone);
  }

  public async receiveMoney(accountId: string, money: number): Promise<Account> {

    let account: Account = await this.findAccountByAccountId(accountId);

    const changeMoney: number = Number(account.money) + money;
    account.money = changeMoney;

    await this.connection.transaction('SERIALIZABLE', async manager => {

      account = await this.accountRepository.changeMoney(manager, account)
    });

    return account;
  }

  public async sendMoney(bankEndPoint: BankEndPoint, account: Account, receiveId: string, money: number): Promise<Account> {

    const changeMoney: number = account.money - money;

    if (changeMoney < 0) {

      throw new ForbiddenException('잔액이 모자랍니다');
    }

    account.money = changeMoney;

    await this.connection.transaction('SERIALIZABLE', async manager => {

      account = await this.accountRepository.changeMoney(manager, account)

      await customAxiosUtil.post(bankEndPoint, {
        sendId: account.accountId,
        receiveId,
        money,
      });
    });

    return account
  }
}
