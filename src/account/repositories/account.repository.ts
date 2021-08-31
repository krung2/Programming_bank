import { EntityManager, EntityRepository, Repository, TransactionManager } from "typeorm";
import Account from "../entities/account.entity";

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {

  public findAccountByPhone(phone: string): Promise<Account[]> {
    return this.createQueryBuilder()
      .where('user_phone = :phone', { phone })
      .getMany();
  }

  public findAccountByAccountId(accountId: string): Promise<Account | undefined> {
    return this.createQueryBuilder()
      .where('account_id = :accountId', { accountId })
      .getOne();
  }

  public findMyAccounts(userPhone: string): Promise<Account[]> {
    return this.createQueryBuilder()
      .where('user_phone = :userPhone', { userPhone })
      .getMany()
  }

  public changeMoney(@TransactionManager() manager: EntityManager, account: Account, money: number): Promise<Account> {
    return manager.save<Account>({
      ...account,
      money,
    });
  }
}