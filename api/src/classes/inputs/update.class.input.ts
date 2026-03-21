import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateClassInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
