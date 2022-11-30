import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';

export const User =  createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
