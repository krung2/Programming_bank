import { Repository, EntityRepository } from "typeorm";
import User from "../entities/user.entity";

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
      .andWhere('pw = :pw', { pw })
      .getOne();
  }

  public countAllUser(): Promise<number> {
    return this.createQueryBuilder()
      .getCount();
  }

  public getAllUser(): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.account', 'account')
      .getMany();
  }
}