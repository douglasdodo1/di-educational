import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeacherModel } from './teachers.model';
import { TeachersService } from './teachers.service';
import { UpdateTeacherInput } from './inputs/update.teacher.input';

@Resolver(() => TeacherModel)
export class TeachersResolver {
  constructor(private teachersService: TeachersService) {}

  @Query(() => [TeacherModel])
  teachers(): Promise<TeacherModel[]> {
    return this.teachersService.findAll();
  }

  @Query(() => TeacherModel, { nullable: true })
  teacher(@Args('id') id: number): Promise<TeacherModel | null> {
    return this.teachersService.findById(id);
  }

  @Mutation(() => Boolean)
  updateTeacher(
    @Args('id') id: number,
    @Args('data', { type: () => UpdateTeacherInput }) data: UpdateTeacherInput,
  ): Promise<boolean> {
    return this.teachersService.update(id, data);
  }
}
