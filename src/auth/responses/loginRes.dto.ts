import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import User from "../entities/user.entity";

export default class LoginResponseDto {

  public user!: User;
  public token: string;
  public refreshToken!: string;

  constructor(
    user: User,
    token: string,
    refreshToken: string,
  ) {
    this.user = user;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}

export class ILoginResponse extends BaseResponse<LoginResponseDto> {

  @ApiProperty({
    type: () => LoginResponseDto
  })
  data: LoginResponseDto;
}