import { Module } from '@nestjs/common';
import { TimelineRepository } from './timeline.repository';
import { TimelineService } from './timeline.service';
import { TimelineResolver } from './timeline.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    TimelineRepository,
    TimelineService,
    TimelineResolver,
    PrismaService,
  ],
})
export class TimelineModule {}
