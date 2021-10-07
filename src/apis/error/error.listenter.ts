import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitterConst } from 'src/global/constants/eventEmitter.const';
import { SseConst } from 'src/global/constants/sse.const';
import { ErrorThrowEvent } from 'src/global/events/error/ErrorThrow.event';
import { SseService } from '../sse/sse.service';

@Injectable()
export class ErrorListener {

  constructor(
    private readonly sseService: SseService,
  ) { }

  @OnEvent(EventEmitterConst.ERROR_CREATE)
  public errorEvent(errorThrowEvent: ErrorThrowEvent) {

    this.sseService.addEvent({
      type: SseConst.ERROR,
      data: errorThrowEvent,
    });
  }
}
