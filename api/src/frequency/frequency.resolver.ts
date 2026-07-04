import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { FrequencyModel } from './frequency.model';
import { FrequencyService } from './frequency.service';

@Resolver(() => FrequencyModel)
export class FrequencyResolver {
  constructor(private frequencyService: FrequencyService) {}

  @Query(() => [FrequencyModel])
  frequencies(
    @Args('attendenceId', { type: () => Int }) attendenceId: number,
  ): Promise<FrequencyModel[]> {
    return this.frequencyService.findAllByAttendenceId(attendenceId);
  }
}
