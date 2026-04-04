import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersResolver } from './teachers.resolver';
import { PrismaService } from 'src/prisma.service';
import { TeachersRepository } from './teachers.repository';
import { UsersModule } from '../users.module';

@Module({
  imports: [UsersModule],
  providers: [
    TeachersService,
    TeachersResolver,
    TeachersRepository,
    PrismaService,
  ],
})
export class TeachersModule {}
