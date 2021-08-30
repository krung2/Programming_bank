import { ApiProperty } from "@nestjs/swagger";
import BaseResponse from "src/global/response/base.response";

export default class ReissuanceResponseData {

  public token!: string;
}

export class IReissuanceResponse extends BaseResponse<ReissuanceResponseData> {

  @ApiProperty({
    type: () => ReissuanceResponseData
  })
  data!: ReissuanceResponseData;
}