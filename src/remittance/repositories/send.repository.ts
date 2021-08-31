import { EntityRepository, Repository } from "typeorm";
import Send from "../entities/send.entity";

@EntityRepository(Send)
export default class SendRepository extends Repository<Send> {

  public findSendRecordByAccountId(accountId: string): Promise<Send[]> {
    return this.createQueryBuilder()
      .where('sender_id = :accountId', { accountId })
      .getMany()
  }
}