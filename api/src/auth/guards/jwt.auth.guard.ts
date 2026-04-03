import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-access') {
  getRequest(context: ExecutionContext): FastifyRequest {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{ req: FastifyRequest }>();
    return gqlContext.req;
  }
}
