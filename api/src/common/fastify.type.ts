import { FastifyReply, FastifyRequest } from 'fastify';

export type GqlContext = FastifyRequest & {
  reply: FastifyReply;
};
