import { FastifyReply, FastifyRequest } from 'fastify';
import { UserModel } from 'src/users/models/users.model';

export interface GqlContext {
  req: FastifyRequest & {
    user: UserModel;
  };
  res: FastifyReply;
}
