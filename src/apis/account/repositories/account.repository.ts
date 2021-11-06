import { IAccounMoney } from "src/global/interfaces/IAccountMoney";
import { EntityManager, EntityRepository, Repository, TransactionManager } from "typeorm";
import Account from "../entities/account.entity";

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {

  public findAccountByPhone(phone: string): Promise<Account[]> {
    return this.createQueryBuilder('account')
      .leftJoinAndSelect('account.user', 'user')
      .where('user_phone = :phone', { phone })
      .getMany();
  }

  public findAccountByAccountId(accountId: string): Promise<Account | undefined> {
    return this.createQueryBuilder('account')
      .leftJoinAndSelect("account.user", "user")
      .where('account.account_id = :accountId', { accountId })
      .getOne();
  }

  public findAccountByAccountIdWithPw(accountId: string, accountPw): Promise<Account | undefined> {
    return this.createQueryBuilder()
      .where('account_id = :accountId', { accountId })
      .andWhere('password = :accountPw', { accountPw })
      .getOne();
  }

  public findMyAccounts(userPhone: string): Promise<Account[]> {
    return this.createQueryBuilder()
      .where('user_phone = :userPhone', { userPhone })
      .getMany()
  }

  public getAllBankMoney(): Promise<IAccounMoney[]> {
    return this.createQueryBuilder()
      .select('money')
      .getRawMany();
  }

  public changeMoney(@TransactionManager() manager: EntityManager, account: Account): Promise<Account> {
    return manager.save<Account>(account);
  }
}