import { ConflictException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { sha512 } from 'js-sha512';
import { AccountConst } from 'src/global/constants/account.const';
import { accountPwPattern } from 'src/global/patterns/accountPattern';
import { isDiffrentUtil } from 'src/global/utils/Comparison.util';
import { randomNum0To9 } from 'src/global/utils/RandomNum.util';
import { validationData, validationPattern } from 'src/global/utils/validationData.util';
import User from 'src/user/entities/user.entity';
import AddAccountDto from './dto/addAccount.dto';
import Account from './entities/account.entity';
import AccountRepository from './repositories/account.repository';

@Injectable()
export class AccountService {

  constructor(
    private readonly accountRepository: AccountRepository,
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
}
