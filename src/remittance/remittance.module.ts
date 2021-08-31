import { Module } from '@nestjs/common';
import { RemittanceController } from './remittance.controller';
import { RemittanceService } from './remittance.service';

@Module({
  controllers: [RemittanceController],
  providers: [RemittanceService]
})
export class RemittanceModule {}
