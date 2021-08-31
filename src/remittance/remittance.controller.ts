import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/global/response/base.response';
import SendMoneyDto from './dto/sendMoney.dto';
import { RemittanceService } from './remittance.service';

@ApiTags('remittance')
@Controller('remittance')
export class RemittanceController {

  constructor(
    private readonly remittanceService: RemittanceService,
  ) { }

  @Post('/send')
  @HttpCode(200)
  async sendMony(
    @Body() sendMoneyDto: SendMoneyDto,
  ): Promise<BaseResponse<undefined>> {

    await this.remittanceService.sendMoney(sendMoneyDto);

    return new BaseResponse<undefined>(200, '송금 성공');
  }

  @Post('/receive')
  @HttpCode(200)
  async receiveMony(
    @Body() sendMoneyDto: SendMoneyDto,
  ): Promise<BaseResponse<undefined>> {

    await this.remittanceService.receiveMoney(sendMoneyDto);

    return new BaseResponse<undefined>(200, '입금 받기 성공');
  }
}