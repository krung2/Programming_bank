import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import Account from "../entities/account.entity";

export class AddAccountResponse extends BaseResponse<Account> {

  @ApiProperty({
    type: () => Account
  })
  data: Account;
}