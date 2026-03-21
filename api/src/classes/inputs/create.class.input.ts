import { Field, InputType } from '@nestjs/graphql';
import { ContentsModel } from 'src/contents/contents.model';

@InputType()
export class CreateClassInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => ContentsModel)
  content!: ContentsModel;
}
