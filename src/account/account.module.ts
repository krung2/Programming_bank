import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import AccountRepository from './repositories/account.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountRepository,
    ])
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule { }
