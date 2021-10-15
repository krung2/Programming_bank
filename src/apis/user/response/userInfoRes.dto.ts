import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import User from "../entities/user.entity";

export class UserInfoResponse extends BaseResponse<User> {

  @ApiProperty({
    type: () => User
  })
  data!: User;
}