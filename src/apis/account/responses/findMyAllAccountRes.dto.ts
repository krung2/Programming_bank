import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";

export class FindMyAllAccountResDto extends BaseResponse<FindMyAllAccountDto[]> {

  @ApiProperty({
    type: () => [FindMyAllAccountDto]
  })
  data!: FindMyAllAccountDto[];
}

export class FindMyAllAccountDto {

  constructor(
    public accountId: string,
    public phone: string,
    public name: string,
  ) { }
}