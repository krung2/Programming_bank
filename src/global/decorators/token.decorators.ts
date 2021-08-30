import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User: ParameterDecorator = createParamDecorator((data: any, ctx: ExecutionContext): ParameterDecorator => {

  return ctx.switchToHttp().getRequest().user;
})