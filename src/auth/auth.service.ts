import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { easyLoginPwPattern } from 'src/global/patterns/easyLoginPattern';
import { validationData, validationPattern } from 'src/global/utils/validationData.util';
import { TokenService } from 'src/token/token.service';
import EasyLoginRegisterDto from './dto/easyLoginRegister.dto';
import Authentication from './entities/authentication.entity';
import User from '../user/entities/user.entity';
import AuthenticationRepository from './repositories/auth.repository';
import { sha512 } from 'js-sha512';
import EasyLoginDto from './dto/easyLogin.dto';
import LoginResponseData from './responses/loginRes.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
    private readonly tokenService: TokenService,
  ) { }

  public easyLoginRegister(user: User, easyLoginRegisterDto: EasyLoginRegisterDto): Promise<Authentication> {

    const { key }: { key: string } = easyLoginRegisterDto;

    if (validationPattern(easyLoginPwPattern, key)) {

      throw new ForbiddenException('비밀번호는 6자리 숫자여야 합니다');
    }

    return this.authenticationRepository.save({
      user,
      key: sha512(key),
    });
  }

  public async easyLogin(easyLoginDto: EasyLoginDto): Promise<LoginResponseData> {

    const { easyLoginId, key }: { easyLoginId: string, key: string } = easyLoginDto;

    const authentication: Authentication | undefined = await this.authenticationRepository.findByIdAndUserId(
      easyLoginId,
      sha512(key)
    )

    if (validationData(authentication)) {

      throw new UnauthorizedException('가입하지 않은 유저 혹은 틀린 비밀번호입니다');
    }

    const { user }: { user: User } = authentication;
    const token: string = this.tokenService.generateAccessToken(user.phone);
    const refreshToken: string = this.tokenService.generateRefreshToken(user.phone);

    return new LoginResponseData(user, token, refreshToken);
  }
}