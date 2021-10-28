import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddMyAccountDto {

  @ApiProperty()
  @IsNotEmpty()
  accounts!: MyAccountDto[];
}

export class MyAccountDto {

  @ApiProperty()
  @IsNotEmpty()
  accountName!: string;

  @ApiProperty()
  @IsNotEmpty()
  accountId!: string;
}