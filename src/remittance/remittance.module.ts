import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemittanceController } from './remittance.controller';
import { RemittanceService } from './remittance.service';
import ReceiveRepository from './repositories/receive.repository';
import SendRepository from './repositories/sned.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReceiveRepository,
      SendRepository,
    ])
  ],
  controllers: [RemittanceController],
  providers: [RemittanceService],
  exports: [RemittanceService]
})
export class RemittanceModule { }
