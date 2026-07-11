import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Mutation(() => FrequencyModel)
  setFrequency(
    @Args('frequencyId', { type: () => Int }) frequencyId: number,
    @Args('isPresent', { type: () => Boolean }) isPresent: boolean,
  ): Promise<FrequencyModel> {
    return this.frequencyService.setFrequency(frequencyId, isPresent);
  }

  @Mutation(() => [FrequencyModel])
  setAllFrequencies(
    @Args('attendenceId', { type: () => Int }) attendenceId: number,
    @Args('isPresent', { type: () => Boolean }) isPresent: boolean,
  ): Promise<FrequencyModel[]> {
    return this.frequencyService.setAllFrequencies(attendenceId, isPresent);
  }
}
