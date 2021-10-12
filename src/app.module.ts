import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { AuthModule } from './apis/auth/auth.module';
import { TokenModule } from './apis/token/token.module';
import { UserModule } from './apis/user/user.module';
import { AccountModule } from './apis/account/account.module';
import { RemittanceModule } from './apis/remittance/remittance.module';
import { DatabaseModule } from './config/database/database.module';
import { PageModule } from './page/page.module';
import { ErrorModule } from './apis/error/error.module';
import { SseModule } from './apis/sse/sse.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './global/filters/error.filter';

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
    DatabaseModule,
    PageModule,
    ErrorModule,
    SseModule,
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: ErrorFilter,
  }],
})

export class AppModule { }