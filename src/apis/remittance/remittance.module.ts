import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/apis/account/account.module';
import { SseModule } from '../sse/sse.module';
import { ReceiveSubscriber } from './receivce.subscriber';
import { RemittanceController } from './remittance.controller';
import { RemittanceService } from './remittance.service';
import ReceiveRepository from './repositories/receive.repository';
import SendRepository from './repositories/send.repository';
import { SendSubscriber } from './send.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReceiveRepository,
      SendRepository,
    ]),
    AccountModule,
    SseModule,
  ],
  controllers: [RemittanceController],
  providers: [RemittanceService, SendSubscriber, ReceiveSubscriber],
  exports: [RemittanceService]
})
export class RemittanceModule { }