import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { TeacherModel } from './teachers.model';
import { TeachersService } from './teachers.service';
import { CreateTeacherInput } from './inputs/create-teacher.input';
import { UpdateTeacherInput } from './inputs/update-teacher.input';

@Resolver(() => TeacherModel)
export class TeachersResolver {
  constructor(private teachersService: TeachersService) {}

  @Query(() => [TeacherModel])
  teachers(): Promise<TeacherModel[]> {
    return this.teachersService.findAll();
  }

  @Query(() => TeacherModel, { nullable: true })
  teacher(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TeacherModel | null> {
    return this.teachersService.findById(id);
  }

  @Mutation(() => TeacherModel)
  createTeacher(
    @Args('data', { type: () => CreateTeacherInput }) data: CreateTeacherInput,
  ) {
    return this.teachersService.create(data);
  }

  @Mutation(() => TeacherModel)
  updateTeacher(
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateTeacherInput }) data: UpdateTeacherInput,
  ) {
    return this.teachersService.update(id, data);
  }

  @Mutation(() => Boolean)
  deleteTeacher(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.teachersService.delete(id);
  }
}
