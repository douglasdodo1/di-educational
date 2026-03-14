import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeacherModel } from './teachers.model';
import { TeachersService } from './teachers.service';
import { CreateTeacherDTO } from './dtos/create-teacher.dto';

@Resolver(() => TeacherModel)
export class TeachersResolver {
  constructor(private teachersService: TeachersService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World';
  }

  @Mutation(() => TeacherModel)
  createTeacher(@Args('data') data: CreateTeacherDTO) {
    return this.teachersService.create(data);
  }
}
