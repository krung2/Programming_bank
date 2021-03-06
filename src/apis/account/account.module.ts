import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountRepository from './repositories/account.repository';
import { TokenModule } from 'src/apis/token/token.module';
import { UserModule } from 'src/apis/user/user.module';
import MyAccountRepository from './repositories/myAccount.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
      MyAccountRepository
    ]),
    TokenModule,
    UserModule,
  ],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule { }
