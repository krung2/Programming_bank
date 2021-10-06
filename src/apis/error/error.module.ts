import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SseModule } from '../sse/sse.module';
import { ErrorListener } from './error.listenter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    SseModule,
  ],
  providers: [ErrorListener],
  exports: [ErrorListener]
})
export class ErrorModule { }
