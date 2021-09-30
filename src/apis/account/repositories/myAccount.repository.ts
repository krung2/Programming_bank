import { EntityRepository, Repository } from "typeorm";
import MyAccount from "../entities/myAccount.entity";

@EntityRepository(MyAccount)
export default class MyAccountRepository extends Repository<MyAccount> {

  public getMyAccountByUserId(userId: string): Promise<MyAccount[]> {
    return this.createQueryBuilder()
      .where('user_id = :userId', { userId })
      .getMany()
  }
}