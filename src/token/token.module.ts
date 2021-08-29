import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './controller/token.controller';
import { TokenService } from './service/token.service';

@Module({
  imports: [JwtModule.register({})],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService]
})
export class TokenModule { }
