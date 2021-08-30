import { BadRequestException, GoneException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IToken } from 'src/global/interfaces/IToken';
import { ITokenPayload } from 'src/global/interfaces/ITokenPayload';
import ReissuanceDto from './dto/reissuance.dto';

@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  public generateAccessToken(userPhone: string): string {

    const payload: ITokenPayload = {
      userPhone,
    };

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_EXPIRE'),
      issuer: 'kaBank',
      subject: 'token',
    };

    return this.jwtService.sign(payload, option);
  }

  public generateRefreshToken(userPhone: string): string {

    const payload: ITokenPayload = {
      userPhone,
    };

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_EXPIRE'),
      issuer: 'kaBank',
      subject: 'refreshToken',
    };

    return this.jwtService.sign(payload, option);
  }

  public async accessTokenReissuance(reissuanceDto: ReissuanceDto): Promise<string> {

    const verifyToken: IToken = await this.verifyToken(reissuanceDto.refreshToken);

    if (verifyToken.iss !== 'kaBank' && verifyToken.sub !== 'refreshToken') {

      throw new UnauthorizedException('토큰이 잘못됨 위조되었습니다');
    }

    return this.generateAccessToken(verifyToken.userPhone);
  }

  async verifyToken(token: string): Promise<IToken> {
    try {

      return this.jwtService.verify(token);
    } catch (err) {

      switch (err.message) {
        case 'jwt must be provided':
          throw new BadRequestException('토큰이 전송되지 않았습니다');
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
          throw new UnauthorizedException('위조된 토큰입니다');
        case 'jwt expired':
          throw new GoneException('토큰이 만료되었습니다');
        default:

          Logger.error(err);
          throw new InternalServerErrorException('다시 시도해 주세요');
      }
    }
  }
}
