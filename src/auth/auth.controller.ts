import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/global/response/base.response';
import { UserService } from './services/user.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('/register')
  @HttpCode(200)
  @ApiOkResponse({
    description: '회원가입이 완료되었습니다',
    type: BaseResponse
  })
  @ApiForbiddenResponse({ description: '중복된 계정입니다' })
  async register(
    @Body() registerDto: RegisterDto
  ): Promise<BaseResponse<undefined>> {

    await this.userService.register(registerDto);

    return new BaseResponse<undefined>(HttpStatus.OK, '회원가입이 완료되었습니다');
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({
    description: '로그인 성공',
    type: BaseResponse
  })
  async login(
    @Body() loginDto: LoginDto
  ) {

  }
}