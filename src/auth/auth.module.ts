import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import AuthenticationRepository from './repositories/auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthenticationRepository
    ]),
    UserModule,
    TokenModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
