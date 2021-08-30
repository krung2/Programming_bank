import { EntityRepository, Repository } from "typeorm";
import Authentication from "../entities/authentication.entity";

@EntityRepository(Authentication)
export default class AuthenticationRepository extends Repository<Authentication> {

}