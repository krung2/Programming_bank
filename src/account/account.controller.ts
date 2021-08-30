import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Token } from 'src/global/decorators/token.decorators';
import AuthGaurd from 'src/global/gaurds/auth.gaurd';
import BaseResponse from 'src/global/response/base.response';
import User from 'src/user/entities/user.entity';
import { AccountService } from './account.service';
import AddAccountDto from './dto/addAccount.dto';
import Account from './entities/account.entity';

@Controller('account')
export class AccountController {

  constructor(
    private readonly accountService: AccountService,
  ) { }

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  async addAccount(
    @Token() user: User,
    @Body() addAccountDto: AddAccountDto,
  ): Promise<BaseResponse<Account>> {

    const account: Account = await this.accountService.addAccount(user, addAccountDto);

    return new BaseResponse<Account>(200, '계좌 개설 성공', account);
  }
}