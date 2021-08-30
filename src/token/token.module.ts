import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Container } from 'typeorm-typedi-extensions';
import { TokenController } from './controller/token.controller';
import { TokenService } from './service/token.service';

const a: ConfigService = Container.get(ConfigService);

@Module({
  imports: [
    JwtModule.register({ secret: a.get('JWT_SECRET') }),
    ConfigModule
  ],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule { }
