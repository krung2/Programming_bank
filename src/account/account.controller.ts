import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/global/decorators/token.decorators';
import AuthGaurd from 'src/global/gaurds/auth.gaurd';
import BaseResponse from 'src/global/response/base.response';
import User from 'src/user/entities/user.entity';
import { AccountService } from './account.service';
import AddAccountDto from './dto/addAccount.dto';
import Account from './entities/account.entity';
import { AddAccountResponse } from './responses/addAccountRes.dto';
import { FindAccountManyResponse } from './responses/findAccountManyRes.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {

  constructor(
    private readonly accountService: AccountService,
  ) { }

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  @ApiOkResponse({
    description: '계좌 개설 성공',
    type: AddAccountResponse,
  })
  async addAccount(
    @Token() user: User,
    @Body() addAccountDto: AddAccountDto,
  ): Promise<BaseResponse<Account>> {

    const account: Account = await this.accountService.addAccount(user, addAccountDto);

    return new BaseResponse<Account>(200, '계좌 개설 성공', account);
  }

  @Get('/findPhone/:phone')
  @ApiOkResponse({
    description: '계좌 정보 불러오기 성공',
    type: FindAccountManyResponse
  })
  async findAccountByPhone(
    @Param('phone') userPhone: string,
  ): Promise<BaseResponse<Account[]>> {

    const accounts: Account[] = await this.accountService.findAccountByPhone(userPhone);

    return new BaseResponse<Account[]>(200, '계좌 정보 불러오기 성공', accounts);
  }
}