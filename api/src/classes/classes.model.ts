import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ContentModel } from 'src/contents/content.model';

@ObjectType()
export class ClassModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => ContentModel, { nullable: true })
  content?: ContentModel | null;
}
