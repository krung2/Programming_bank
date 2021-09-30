import { EntityRepository, Repository } from "typeorm";
import Authentication from "../entities/authentication.entity";

@EntityRepository(Authentication)
export default class AuthenticationRepository extends Repository<Authentication> {

  public findByIdAndUserId(id: string, key: string): Promise<Authentication | undefined> {
    return this.createQueryBuilder('authentication')
      .leftJoinAndSelect('authentication.user', 'user')
      .where('authentication.id = :id', { id })
      .andWhere('authentication.key = :key', { key })
      .getOne()
  }
}