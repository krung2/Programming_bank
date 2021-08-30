import { EntityRepository, Repository } from "typeorm";
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
}