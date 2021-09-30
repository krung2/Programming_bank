import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class EasyLoginRegisterDto {

  @ApiProperty()
  @IsNotEmpty()
  key: string;
}