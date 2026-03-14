import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [StudentsService, StudentsResolver, PrismaService],
})
export class StudentsModule {}
