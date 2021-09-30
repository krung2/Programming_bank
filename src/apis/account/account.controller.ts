import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Token } from 'src/global/decorators/token.decorators';
import AuthGaurd from 'src/global/gaurds/auth.gaurd';
import BaseResponse from 'src/global/response/base.response';
import User from 'src/apis/user/entities/user.entity';
import { AccountService } from './account.service';
import AddAccountDto from './dto/addAccount.dto';
import Account from './entities/account.entity';
import { AddAccountResponse } from './responses/addAccountRes.dto';
import { FindAccountManyResponse } from './responses/findAccountManyRes.dto';
import { FindAccountResponse } from './responses/findAccountRes.dto';

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

  @Get('/find/my')
  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: '나의 계좌 조회 성공',
    type: FindAccountManyResponse
  })
  @ApiForbiddenResponse({
    description: '등록되지 않은 계좌 번호 입니다',
  })
  async findAccountByToken(
    @Token() user: User,
  ): Promise<BaseResponse<Account[]>> {

    const accounts: Account[] = await this.accountService.findMyAccounts(user);

    return new BaseResponse<Account[]>(200, '나의 계좌 조회 성공', accounts);
  }

  @Get('/find/phone/:phone')
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

  @Get('/find/id/:accountId')
  @ApiOkResponse({
    description: '계좌 조회 성공',
    type: FindAccountResponse
  })
  @ApiForbiddenResponse({
    description: '등록되지 않은 계좌 번호 입니다',
  })
  async findAccountById(
    @Param('accountId') accountId: string
  ): Promise<BaseResponse<Account>> {

    const account: Account = await this.accountService.findAccountByAccountId(accountId);

    return new BaseResponse<Account>(200, '계좌 조회 성공', account);
  }

  @Get('/my/all')
  @ApiOkResponse({
    description: '모든 은행 계좌 불러오기 성공',
    type: FindAccountManyResponse
  })
  async findMyAllAccount(
    @Token() user: User,
  ): Promise<void> {

    // TODO: 다른 계좌와 연동하여 불러오기
  }
}