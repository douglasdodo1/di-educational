import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaExceptionFilter } from './common/filters/prisma.exception.filter';

import { TeachersModule } from './users/teachers/teachers.module';
import { StudentsModule } from './users/students/students.module';
import { PrismaModule } from './prisma.module';
import { CoursesModule } from './Courses/courses.module';
import { ContentsModule } from './contents/contents.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GqlContext } from './common/fastify.type';
import { AttendenceModule } from './attendence/attendence.module';
import { FrequencyModule } from './frequency/frequency.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: (context: GqlContext): GqlContext => context,
    }),
    AuthModule,
    AttendenceModule,
    FrequencyModule,
    TimelineModule,
    CoursesModule,
    ContentsModule,
    UsersModule,
    TeachersModule,
    StudentsModule,
    PrismaModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: PrismaExceptionFilter }],
})
export class AppModule {}
