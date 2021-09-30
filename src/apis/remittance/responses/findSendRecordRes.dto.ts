import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import Send from "../entities/send.entity";

export class FindSendRecordResponse extends BaseResponse<Send[]> {

  @ApiProperty({
    type: () => [Send]
  })
  data: Send[];
}