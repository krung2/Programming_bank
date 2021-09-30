import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectService } from './MysqlConnect.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlConnectService,
    })
  ]
})
export class DatabaseModule { }
