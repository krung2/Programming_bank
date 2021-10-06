import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {

  private events: Subject<MessageEvent> = new Subject<MessageEvent>();

  public addEvent(event: MessageEvent): void {
    this.events.next(event);
  }

  public sendEvents() {
    return this.events.asObservable();
  }
}
