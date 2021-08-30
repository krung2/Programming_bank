import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import AuthRequest from "../types/AuthRequest";

export const Token = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {

    const request: AuthRequest = ctx.switchToHttp().getRequest();

    return request.user;
  })