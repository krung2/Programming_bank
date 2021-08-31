import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class SendMoneyDto {

  @ApiProperty()
  @IsNotEmpty()
  sendId!: string;

  @ApiProperty()
  @IsNotEmpty()
  receiveId!: string;

  @ApiProperty()
  @IsNotEmpty()
  money!: number;
}