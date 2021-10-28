import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class AddAccountDto {

  @ApiProperty()
  @IsNotEmpty()
  password!: string;

  @ApiProperty()
  @IsNotEmpty()
  accountName!: string;
}