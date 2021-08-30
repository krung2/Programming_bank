import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/global/response/base.response';
import { UserService } from '../user/user.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import LoginResponseDto, { ILoginResponse } from './responses/loginRes.dto';
import { AuthService } from './auth.service';
import EasyLoginRegisterDto from './dto/easyLoginRegister.dto';
import AuthGaurd from 'src/global/gaurds/auth.gaurd';
import Authentication from './entities/authentication.entity';
import { Token } from 'src/global/decorators/token.decorators';
import User from './entities/user.entity';
import { EasyLoginRegisterResponse } from './responses/easyLoginRegisterRes.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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
    type: ILoginResponse
  })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<BaseResponse<LoginResponseDto>> {

    const loginResponse: LoginResponseDto = await this.userService.login(loginDto);

    return new BaseResponse<LoginResponseDto>(HttpStatus.OK, '로그인 성공', loginResponse);
  }

  @Post('/easy/register')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  @ApiOkResponse({
    description: '',
    type: EasyLoginRegisterResponse
  })
  async easyLoginRegister(
    @Token() user: User,
    @Body() easyLoginRegisterDto: EasyLoginRegisterDto,
  ) {

    const authentication: Authentication = await this.authService.easyLoginRegister(user, easyLoginRegisterDto);

    return new BaseResponse<Authentication>(200, '비밀번호 설정 완료', authentication);
  }
}