import { Field, InputType, Int } from '@nestjs/graphql';
import { ContentModel } from 'src/contents/content.model';

@InputType()
export class UpdateClassInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ContentModel, { nullable: true })
  content?: ContentModel;
}
