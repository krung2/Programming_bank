import User from "src/apis/user/entities/user.entity";

export interface IResUser extends User {

  moneyCount: number;
}