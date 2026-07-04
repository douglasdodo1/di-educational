import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentModel } from './contents.model';
import { ContentsService } from './contents.service';
import { UpdateContentInput } from './inputs/update.content.input';

@Resolver(() => ContentModel)
export class ContentsResolver {
  constructor(private contentsService: ContentsService) {}

  @Query(() => ContentModel, { nullable: true })
  content(
    @Args('contentId', { type: () => Int }) contentId: number,
  ): Promise<ContentModel | null> {
    return this.contentsService.getContentByID(contentId);
  }

  @Mutation(() => Boolean)
  updateContent(
    @Args('contentId', { type: () => Int }) contentId: number,
    @Args('data', { type: () => UpdateContentInput }) data: UpdateContentInput,
  ): Promise<boolean> {
    return this.contentsService.updateContent(contentId, data);
  }

  @Mutation(() => Boolean)
  deleteContents(
    @Args('contentIds', { type: () => [Int] }) contentIds: number[],
  ): Promise<boolean> {
    return this.contentsService.deleteContents(contentIds);
  }
}
