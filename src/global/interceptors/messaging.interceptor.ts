import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Observable } from "rxjs";
import { EventEmitterConst } from "../constants/eventEmitter.const";
import { ErrorThrowEvent } from "../events/error/ErrorThrow.event";
import { Request, Response } from "express";

@Injectable()
export class MessagingInterceptor implements NestInterceptor {

  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(

      )
  }
}