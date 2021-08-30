import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import User from "../entities/user.entity";

export default class LoginResponseDto {

  user!: User;

  token!: string;

  refreshToken!: string;
}

export class ILoginResponse extends BaseResponse<LoginResponseDto> {

  @ApiProperty({
    type: () => LoginResponseDto
  })
  data: LoginResponseDto;
}