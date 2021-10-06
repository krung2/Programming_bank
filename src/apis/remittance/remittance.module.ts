import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/apis/account/account.module';
import { RemittanceController } from './remittance.controller';
import { RemittanceService } from './remittance.service';
import ReceiveRepository from './repositories/receive.repository';
import SendRepository from './repositories/send.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReceiveRepository,
      SendRepository,
    ]),
    AccountModule,
  ],
  controllers: [RemittanceController],
  providers: [RemittanceService],
  exports: [RemittanceService]
})
export class RemittanceModule { }