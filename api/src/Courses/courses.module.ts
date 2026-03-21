import { Module } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    CoursesRepository,
    CoursesService,
    CoursesResolver,
    PrismaService,
  ],
})
export class CoursesModule {}
