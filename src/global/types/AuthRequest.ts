import User from "src/apis/user/entities/user.entity";

export default class AuthRequest extends Request {

  public user: User;
}