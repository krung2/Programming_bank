import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class ReceiveMoneyDto {

  @ApiProperty()
  @IsNotEmpty()
  sendAccountId!: string;

  @ApiProperty()
  @IsNotEmpty()
  receiveAccountId!: string;

  @ApiProperty()
  @IsNotEmpty()
  money!: number;
}