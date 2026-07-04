import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ContentsRepository } from './contents.repository';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';

@Module({
  providers: [
    ContentsRepository,
    ContentsService,
    ContentsResolver,
    PrismaService,
  ],
})
export class ContentsModule {}
