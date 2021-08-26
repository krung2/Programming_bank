import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnviromentVariables } from './config/env/env';
import { validate } from './config/env/env.validation';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
