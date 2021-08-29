import { ApiProperty } from "@nestjs/swagger";
import User from "../entities/user.entity";

export default class LoginReponse {

  @ApiProperty()
  user!: User;

  @ApiProperty()
  token!: string;

  @ApiProperty()
  refreshToken!: string;

}