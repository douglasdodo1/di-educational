import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { PrismaService } from 'src/prisma.service';
import { StudentsRepository } from './students.repository';

@Module({
  providers: [
    StudentsRepository,
    StudentsService,
    StudentsResolver,
    PrismaService,
  ],
  exports: [StudentsService],
})
export class StudentsModule {}
