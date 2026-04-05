import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersResolver } from './teachers.resolver';
import { PrismaService } from 'src/prisma.service';
import { TeachersRepository } from './teachers.repository';

// teachers.module.ts
@Module({
  providers: [
    TeachersService,
    TeachersResolver,
    TeachersRepository,
    PrismaService,
  ],
  exports: [TeachersService],
})
export class TeachersModule {}
