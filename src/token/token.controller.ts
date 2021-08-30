import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiGoneResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import BaseResponse from 'src/global/response/base.response';
import ReissuanceDto from './dto/reissuance.dto';
import ReissuanceResponseData, { IReissuanceResponse } from './responses/reissuance.response';
import { TokenService } from './token.service';

@ApiTags('token')
@Controller('token')
export class TokenController {

  constructor(
    private readonly tokenService: TokenService,
  ) { }

  @Post('refresh')
  @HttpCode(200)
  @ApiOkResponse({
    description: '토큰이 재발급 되었습니다',
    type: IReissuanceResponse
  })
  @ApiBadRequestResponse({
    description: '토큰이 전송되지 않았습니다',
  })
  @ApiUnauthorizedResponse({
    description: '위조된 토큰입니다',
  })
  @ApiGoneResponse({
    description: '토큰이 만료되었습니다',
  })
  async tokenReissuance(
    @Body() reissuanceDto: ReissuanceDto,
  ) {

    const token: string = await this.tokenService.accessTokenReissuance(reissuanceDto);

    return new BaseResponse<ReissuanceResponseData>(200, '토큰이 재발급 되었습니다', { token })
  }
}