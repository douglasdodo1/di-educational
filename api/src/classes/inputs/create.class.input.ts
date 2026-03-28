import { Field, InputType } from '@nestjs/graphql';
import { CreateContentInput } from 'src/contents/inputs/create.content.input';

@InputType()
export class CreateClassInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => CreateContentInput)
  content!: CreateContentInput;
}
