import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/global/response/base.response';
import FindSendRecordDto from './dto/findSendRecord.dto';
import ReceiveMoneyDto from './dto/receiveMoney.dto';
import SendMoneyDto from './dto/sendMoney.dto';
import Receive from './entities/receive.entity';
import Send from './entities/send.entity';
import { RemittanceService } from './remittance.service';
import { FindReceiveRecordResponse } from './responses/findReceiveRecordRes.dto';
import { FindSendRecordResponse } from './responses/findSendRecordRes.dto';

@ApiTags('remittance')
@Controller('remittance')
export class RemittanceController {

  constructor(
    private readonly remittanceService: RemittanceService,
  ) { }

  @Post('/send')
  @HttpCode(200)
  @ApiOkResponse({
    description: '송금 완료',
    type: BaseResponse
  })
  @ApiForbiddenResponse({
    description: '잘못된 계좌번호입니다'
  })
  @ApiConflictResponse({
    description: '자기 자신에게 보낼 수 없습니다 다'
  })
  async sendMony(
    @Body() sendMoneyDto: SendMoneyDto,
  ): Promise<BaseResponse<undefined>> {

    await this.remittanceService.sendMoney(sendMoneyDto);

    return new BaseResponse<undefined>(200, '송금 성공');
  }

  @Post('/receive')
  @HttpCode(200)
  @ApiOkResponse({
    description: '입금 받기 성공',
    type: BaseResponse
  })
  @ApiForbiddenResponse({
    description: '잘못된 계좌번호입니다'
  })
  async receiveMony(
    @Body() receiveMoneyDto: ReceiveMoneyDto,
  ): Promise<BaseResponse<undefined>> {

    await this.remittanceService.receiveMoney(receiveMoneyDto);

    return new BaseResponse<undefined>(200, '입금 받기 성공');
  }

  @Post('/record/send')
  @HttpCode(200)
  @ApiOkResponse({
    description: '계좌 송금 내역 조회 완료',
    type: FindSendRecordResponse
  })
  @ApiForbiddenResponse({
    description: '잘못된 계좌번호입니다'
  })
  async findSendRecordByAccountId(
    @Body() findSendRecordDto: FindSendRecordDto,
  ): Promise<BaseResponse<Send[]>> {

    const sendRecords: Send[] = await this.remittanceService.findSendRecordByAccountId(findSendRecordDto.accountId);

    return new BaseResponse<Send[]>(200, '계좌 송금 내역 조회 완료', sendRecords);
  }

  @Post('/record/receive')
  @HttpCode(200)
  @ApiOkResponse({
    description: '계좌 수금 내역 조회 완료',
    type: FindReceiveRecordResponse
  })
  @ApiForbiddenResponse({
    description: '잘못된 계좌번호입니다'
  })
  async findRecieveRecordByAccountId(
    @Body() findSendRecordDto: FindSendRecordDto,
  ): Promise<BaseResponse<Receive[]>> {

    const receiveRecords: Receive[] = await this.remittanceService.findRecieveRecordByAccountId(findSendRecordDto.accountId);

    return new BaseResponse<Receive[]>(200, '계좌 수금 내역 조회 완료', receiveRecords);
  }
}