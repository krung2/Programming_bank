import { EntityRepository, Repository } from "typeorm";
import Receive from "../entities/receive.entity";

@EntityRepository(Receive)
export default class ReceiveRepository extends Repository<Receive> {

  public findReceiveRecordByAccountId(accountId: string): Promise<Receive[]> {
    return this.createQueryBuilder()
      .where('receiver_id = :accountId', { accountId })
      .getMany()
  }
}