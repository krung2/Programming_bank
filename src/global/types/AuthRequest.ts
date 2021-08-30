import User from "src/user/entities/user.entity";

export default class AuthRequest extends Request {

  public user: User;
}