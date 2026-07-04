import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AttendenceModel } from './attendence.model';
import { AttendenceService } from './attendence.service';

@Resolver(() => AttendenceModel)
export class AttendenceResolver {
  constructor(private attendenceService: AttendenceService) {}

  @Query(() => [AttendenceModel])
  attendences(
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<AttendenceModel[]> {
    return this.attendenceService.findAllByCourseId(courseId);
  }
}
