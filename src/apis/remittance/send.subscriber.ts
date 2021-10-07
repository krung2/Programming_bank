import { Injectable } from "@nestjs/common";
import { SseConst } from "src/global/constants/sse.const";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { SseService } from "../sse/sse.service";
import Send from "./entities/send.entity";

@Injectable()
@EventSubscriber()
export class SendSubscriber implements EntitySubscriberInterface<Send> {

  constructor(
    readonly connection: Connection,
    private readonly sseService: SseService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Send;
  }

  beforeInsert(event: InsertEvent<Send>) {
    this.sseService.addEvent({
      type: SseConst.SEND,
      data: event.entity
    });
  }
}