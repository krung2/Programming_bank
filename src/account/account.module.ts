import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountRepository from './repositories/account.repository';
import { TokenModule } from 'src/token/token.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
    ]),
    TokenModule,
    UserModule,
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule { }
