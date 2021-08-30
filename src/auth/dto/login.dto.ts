import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class LoginDto {

  @ApiProperty()
  @IsNotEmpty()
  id!: string;

  @ApiProperty()
  @IsNotEmpty()
  pw!: string;
}