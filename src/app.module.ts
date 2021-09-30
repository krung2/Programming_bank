import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validate } from './config/env.validation';
import { AuthModule } from './apis/auth/auth.module';
import { TokenModule } from './apis/token/token.module';
import { UserModule } from './apis/user/user.module';
import { AccountModule } from './apis/account/account.module';
import { RemittanceModule } from './apis/remittance/remittance.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    DatabaseModule,
    AuthModule,
    TokenModule,
    UserModule,
    AccountModule,
    RemittanceModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }