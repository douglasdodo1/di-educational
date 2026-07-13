import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TimelineModel } from './timeline.model';
import { TimelineService } from './timeline.service';

@Resolver(() => TimelineModel)
export class TimelineResolver {
  constructor(private timelineService: TimelineService) {}

  @Query(() => [TimelineModel])
  timelinesByCourseId(
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<TimelineModel[]> {
    return this.timelineService.findAllByCourseId(courseId);
  }
}
