import { Injectable } from "@nestjs/common";
import { SseConst } from "src/global/constants/sse.const";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { SseService } from "../sse/sse.service";
import Receive from "./entities/receive.entity";

@Injectable()
@EventSubscriber()
export class ReceiveSubscriber implements EntitySubscriberInterface<Receive> {

  constructor(
    readonly connection: Connection,
    private readonly sseService: SseService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Receive;
  }

  beforeInsert(event: InsertEvent<Receive>) {
    this.sseService.addEvent({
      type: SseConst.RECEIVE,
      data: event.entity,
    });
  }
}