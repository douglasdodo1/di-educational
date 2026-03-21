import { Field, InputType } from '@nestjs/graphql';
import { ContentModel } from 'src/contents/content.model';

@InputType()
export class CreateClassInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ContentModel)
  content!: ContentModel;
}
