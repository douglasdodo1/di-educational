import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContentModel } from 'src/contents/contents.model';

@ObjectType()
export class TimelineModel {
  @Field(() => Int)
  id!: number;

  @Field(() => Boolean)
  is_done!: boolean;

  @Field(() => Date)
  date!: Date;

  @Field(() => Int, { nullable: true })
  contentId?: number | null;

  @Field(() => ContentModel, { nullable: true })
  content?: ContentModel | null;
}
