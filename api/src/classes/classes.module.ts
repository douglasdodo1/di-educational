import { Module } from '@nestjs/common';
import { classesRepository } from './classes.repository';
import { ClassesService } from './classes.service';
import { ClassesResolver } from './classes.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    classesRepository,
    ClassesService,
    ClassesResolver,
    PrismaService,
  ],
})
export class ClassesModule {}
