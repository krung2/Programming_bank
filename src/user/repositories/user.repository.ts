import { Repository, EntityRepository } from "typeorm";
import User from "../../auth/entities/user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

  public findByPhone(phone: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .where('phone = :phone', { phone })
      .getOne();
  }

  public findById(id: string, pw: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .where('id = :id', { id })
      .where('pw = :pw', { pw })
      .getOne();
  }
}