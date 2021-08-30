import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import User from 'src/auth/entities/user.entity';
import { ITokenPayload } from 'src/global/interfaces/ITokenPayload';

@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  public generateAccessToken(user: User): string {

    const payload: ITokenPayload = {
      userPhone: user.phone,
    };

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_EXPIRE'),
      issuer: 'kaBank',
      subject: 'token',
    };

    return this.jwtService.sign(payload, option);
  }

  public generateRefreshToken(user: User): string {

    const payload: ITokenPayload = {
      userPhone: user.phone,
    };

    const option: JwtSignOptions = {
      expiresIn: this.configService.get('JWT_EXPIRE'),
      issuer: 'kaBank',
      subject: 'refreshToken',
    };

    return this.jwtService.sign(payload, option);
  }
}
