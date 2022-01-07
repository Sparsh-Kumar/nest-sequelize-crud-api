import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Users } from "../models/users.model";

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext): Users => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
