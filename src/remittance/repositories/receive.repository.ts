import { EntityRepository, Repository } from "typeorm";
import Receive from "../entities/receive.entity";

@EntityRepository(Receive)
export default class ReceiveRepository extends Repository<Receive> {

}