import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Request, Response } from "express";
import { EventEmitterConst } from "../constants/eventEmitter.const";
import { ErrorThrowEvent } from "../events/error/ErrorThrow.event";

@Catch()
@Injectable()
export class ErrorFilter<T> implements ExceptionFilter {

  constructor(
    private readonly eventEmitter: EventEmitter2,
  ) { }

  catch(exception: T, host: ArgumentsHost) {

    const req: Request = host.switchToHttp().getRequest();
    const res: Response = host.switchToHttp().getResponse();

    if (exception instanceof HttpException) {

      Logger.warn(exception);
      this.eventEmitter.emit(
        EventEmitterConst.ERROR_CREATE,
        new ErrorThrowEvent(req.ip, req.url, exception.getStatus(), exception.message),
      );

      res.status(exception.getStatus()).json({
        status: exception.getStatus(),
        message: exception.message,
      });
    } else {

      Logger.error(exception);
      this.eventEmitter.emit(
        EventEmitterConst.ERROR_CREATE,
        new ErrorThrowEvent(req.ip, req.url, HttpStatus.INTERNAL_SERVER_ERROR, '서버 오류'),
      );
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '서버 오류',
      });
    }
  }
}