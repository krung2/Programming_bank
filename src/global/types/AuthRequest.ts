import User from "src/auth/entities/user.entity";

export default class AuthRequest extends Request {

  public user: User;
}