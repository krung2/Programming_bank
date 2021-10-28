import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import MyAccount from "../entities/myAccount.entity";

export class AddMyAccountResDto extends BaseResponse<MyAccount[]> {

  @ApiProperty({
    type: () => [MyAccount]
  })
  data!: MyAccount[];
}