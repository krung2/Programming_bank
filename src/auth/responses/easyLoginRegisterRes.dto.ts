import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import Authentication from "../entities/authentication.entity";

export class EasyLoginRegisterResponse extends BaseResponse<Authentication> {

  @ApiProperty({
    type: () => Authentication
  })
  data: Authentication;
}