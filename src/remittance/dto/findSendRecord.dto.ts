import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class FindSendRecordDto {

  @ApiProperty()
  @IsNotEmpty()
  accountId!: string;
}