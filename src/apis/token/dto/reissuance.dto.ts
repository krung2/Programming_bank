import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class ReissuanceDto {

  @ApiProperty()
  @IsNotEmpty()
  refreshToken!: string;
}