import { PrismaService } from 'src/prisma.service';
import { FrequencyRepository } from './frequency.repository';
import { FrequencyResolver } from './frequency.resolver';
import { FrequencyService } from './frequency.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    FrequencyRepository,
    FrequencyService,
    FrequencyResolver,
    PrismaService,
  ],
})
export class FrequencyModule {}
