import { EntityRepository, Repository } from "typeorm";
import Send from "../entities/send.entity";

@EntityRepository(Send)
export default class SendRepository extends Repository<Send> {

}