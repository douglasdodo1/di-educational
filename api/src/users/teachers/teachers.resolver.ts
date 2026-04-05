import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TeachersService } from './teachers.service';
import { UpdateTeacherInput } from './inputs/update.teacher.input';
import { UserModel } from '../models/users.model';
import { TeacherModel } from './teachers.model';

@Resolver(() => UserModel)
export class TeachersResolver {
  constructor(private teachersService: TeachersService) {}

  @Query(() => [UserModel])
  teachers(): Promise<TeacherModel[]> {
    return this.teachersService.findAll();
  }

  @Query(() => UserModel, { nullable: true })
  teacher(@Args('id') id: number): Promise<TeacherModel | null> {
    return this.teachersService.findById(id);
  }

  @Mutation(() => UserModel, { nullable: true })
  updateTeacher(
    @Args('id') id: number,
    @Args('data', { type: () => UpdateTeacherInput }) data: UpdateTeacherInput,
  ): Promise<boolean> {
    return this.teachersService.update(id, data);
  }
}
