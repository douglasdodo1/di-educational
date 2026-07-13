import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimelineModel } from './timeline.model';
import { TimelineService } from './timeline.service';
import { CreateTimelineInput } from './inputs/create.timeline.input';

@Resolver(() => TimelineModel)
export class TimelineResolver {
  constructor(private timelineService: TimelineService) {}

  @Query(() => [TimelineModel])
  timelinesByCourseId(
    @Args('courseId', { type: () => Int }) courseId: number,
  ): Promise<TimelineModel[]> {
    return this.timelineService.findAllByCourseId(courseId);
  }

  @Mutation(() => TimelineModel)
  createTimeline(
    @Args('data') data: CreateTimelineInput,
  ): Promise<TimelineModel> {
    return this.timelineService.create(data);
  }
}
