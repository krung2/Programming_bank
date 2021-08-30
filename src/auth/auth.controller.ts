import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import BaseResponse from 'src/global/response/base.response';
import { UserService } from '../user/user.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import LoginResponseData, { LoginResponse } from './responses/loginRes.dto';
import { AuthService } from './auth.service';
import EasyLoginRegisterDto from './dto/easyLoginRegister.dto';
import AuthGaurd from 'src/global/gaurds/auth.gaurd';
import Authentication from './entities/authentication.entity';
import { Token } from 'src/global/decorators/token.decorators';
import User from './entities/user.entity';
import { EasyLoginRegisterResponse } from './responses/easyLoginRegisterRes.dto';
import EasyLoginDto from './dto/easyLogin.dto';

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
    type: LoginResponse
  })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<BaseResponse<LoginResponseData>> {

    const loginResponse: LoginResponseData = await this.userService.login(loginDto);

    return new BaseResponse<LoginResponseData>(HttpStatus.OK, '로그인 성공', loginResponse);
  }

  @Post('/easy/register')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  @ApiOkResponse({
    description: '간편 비밀번호 설정 완료',
    type: EasyLoginRegisterResponse
  })
  @ApiForbiddenResponse({
    description: '간편 비밀번호는 6자리 숫자여야 합니다',
  })
  async easyLoginRegister(
    @Token() user: User,
    @Body() easyLoginRegisterDto: EasyLoginRegisterDto,
  ): Promise<BaseResponse<string>> {

    const authentication: Authentication = await this.authService.easyLoginRegister(user, easyLoginRegisterDto);

    return new BaseResponse<string>(200, '간편 로그인 비밀번호 설정 완료', authentication.id);
  }

  @Post('/easy/login')
  @HttpCode(200)
  @ApiOkResponse({
    description: '간편 로그인 성공',
    type: LoginResponse
  })
  @ApiUnauthorizedResponse({
    description: '가입하지 않은 유저 혹은 틀린 비밀번호 입니다',
  })
  async easyLogin(
    @Body() easyLoginDto: EasyLoginDto,
  ): Promise<BaseResponse<LoginResponseData>> {

    const authenticationLogin: LoginResponseData = await this.authService.easyLogin(easyLoginDto);

    return new BaseResponse<LoginResponseData>(200, '간편 로그인 성공', authenticationLogin);
  }

}