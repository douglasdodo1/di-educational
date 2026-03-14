import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersResolver } from './teachers.resolver';
import { PrismaService } from 'src/prisma.service';
@Module({
  providers: [TeachersService, TeachersResolver, PrismaService],
})
export class TeachersModule {}
