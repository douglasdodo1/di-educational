import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt.payload';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error('JWT_ACCESS_SECRET não definido');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: FastifyRequest) => {
          return (req?.cookies as Record<string, string>)?.access_token ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
