import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import type {
  FastifyReply,
  FastifyRequest,
} from '@nestjs/platform-fastify/node_modules/fastify';
import './enums';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCookie as any);

  const fastify = app.getHttpAdapter().getInstance();
  fastify.addHook(
    'onRequest',
    (
      request: FastifyRequest & { reply?: FastifyReply },
      reply: FastifyReply,
      done: () => void,
    ) => {
      request.reply = reply;
      done();
    },
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log(`Server running on port ${process.env.PORT ?? 3001}`);
}
void bootstrap();
