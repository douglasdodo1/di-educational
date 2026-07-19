import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttendenceModel } from './attendence.model';
import { AttendenceService } from './attendence.service';
import { CreateAttendenceInput } from './inputs/create.attendence.input';
import { UpdateAttendenceInput } from './inputs/update.attendence.input';

@Resolver(() => AttendenceModel)
export class AttendenceResolver {
  constructor(private attendenceService: AttendenceService) {}

  @Query(() => [AttendenceModel])
  attendences(
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<AttendenceModel[]> {
    return this.attendenceService.findAllByCourseId(courseId);
  }

  @Mutation(() => AttendenceModel)
  createAttendence(
    @Args('createAttendenceInput', { type: () => CreateAttendenceInput })
    createAttendenceInput: CreateAttendenceInput,
  ): Promise<AttendenceModel> {
    return this.attendenceService.create(createAttendenceInput);
  }

  @Mutation(() => AttendenceModel)
  updateAttendence(
    @Args('updateAttendenceInput', { type: () => UpdateAttendenceInput })
    updateAttendenceInput: UpdateAttendenceInput,
  ): Promise<AttendenceModel> {
    return this.attendenceService.update(updateAttendenceInput);
  }

  @Mutation(() => Boolean)
  deleteAttendence(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.attendenceService.delete(id);
  }
}
