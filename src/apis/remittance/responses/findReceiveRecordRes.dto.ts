import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";
import Receive from "../entities/receive.entity";

export class FindReceiveRecordResponse extends BaseResponse<Receive[]> {

  @ApiProperty({
    type: () => [Receive]
  })
  data: Receive[];
}