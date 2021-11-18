import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { map, Observable, tap } from "rxjs";
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

    return next.handle().pipe(
      tap(() => this.eventEmitter.emit(
        EventEmitterConst.ERROR_CREATE,
        new ErrorThrowEvent(req.ip, req.url, HttpStatus.OK, '요청 성공'),
      ))
    );
  }
}