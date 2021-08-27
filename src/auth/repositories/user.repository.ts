import { Repository, EntityRepository } from "typeorm";
import User from "../entities/user.entity";

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

  public findByPhone(phone: string): Promise<User | undefined> {
    return this.createQueryBuilder()
      .where('phone = :phone', { phone })
      .getOne();
  }
}