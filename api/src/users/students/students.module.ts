import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';
import { PrismaService } from 'src/prisma.service';
import { StudentsRepository } from './students.repository';
import { UsersModule } from '../users.module';

@Module({
  imports: [UsersModule],

  providers: [
    StudentsRepository,
    StudentsService,
    StudentsResolver,
    PrismaService,
  ],
})
export class StudentsModule {}
