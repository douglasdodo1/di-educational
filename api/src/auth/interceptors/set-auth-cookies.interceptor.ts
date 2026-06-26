import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FastifyReply } from 'fastify';
import { map, Observable } from 'rxjs';
import { GqlContext } from 'src/common/fastify.type';
import { AuthResponse } from '../inputs/auth.response.input';

@Injectable()
export class SetAuthCookiesInterceptor implements NestInterceptor<
  AuthResponse,
  AuthResponse
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthResponse>,
  ): Observable<AuthResponse> {
    const ctx = GqlExecutionContext.create(context);
    const reply: FastifyReply = ctx.getContext<GqlContext>().reply;

    return next.handle().pipe(
      map((data: AuthResponse) => {
        if (data == null) return data;

        reply?.setCookie('access_token', data.access_token, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60,
        });

        reply?.setCookie('refresh_token', data.refresh_token, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });

        return data;
      }),
    );
  }
}
