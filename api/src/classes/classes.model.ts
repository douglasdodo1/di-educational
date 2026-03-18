import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ContentModel } from 'src/contents/content.model';

@ObjectType()
export class ClassModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => ContentModel)
  content!: ContentModel;
}
