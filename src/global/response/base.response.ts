import { ApiProperty } from "@nestjs/swagger";

export default class BaseResponse {

  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  constructor(
    status: number,
    message: string,
  ) {
    this.status = status;
    this.message = message;
  }
}