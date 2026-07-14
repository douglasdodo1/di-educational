import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TimelineModel } from './timeline.model';
import { TimelineService } from './timeline.service';
import { CreateTimelineInput } from './inputs/create.timeline.input';
import { EditTimelineInput } from './inputs/edit.timeline.input';
import { EditTimelineIsDoneInput } from './inputs/edit.isdone.timeline.input';

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

  @Mutation(() => TimelineModel)
  updateTimeline(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: EditTimelineInput,
  ): Promise<TimelineModel> {
    return this.timelineService.update(id, data);
  }

  @Mutation(() => TimelineModel)
  updateTimelineIsDone(
    @Args('id', { type: () => Int }) id: number,
    @Args('data') data: EditTimelineIsDoneInput,
  ): Promise<TimelineModel> {
    return this.timelineService.updateIsDone(id, data);
  }
}
