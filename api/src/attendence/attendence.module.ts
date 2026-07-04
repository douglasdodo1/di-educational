import { Module } from '@nestjs/common';
import { AttendenceRepository } from './attendence.repository';
import { AttendenceService } from './attendence.service';
import { AttendenceResolver } from './attendence.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    AttendenceRepository,
    AttendenceService,
    AttendenceResolver,
    PrismaService,
  ],
})
export class AttendenceModule {}
