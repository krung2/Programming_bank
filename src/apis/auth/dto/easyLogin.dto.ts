import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class EasyLoginDto {

  @ApiProperty()
  @IsNotEmpty()
  easyLoginId!: string;

  @ApiProperty()
  @IsNotEmpty()
  key!: string;
}