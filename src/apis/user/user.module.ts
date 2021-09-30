import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/apis/token/token.module';
import UserRepository from './repositories/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
    ]),
    TokenModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
