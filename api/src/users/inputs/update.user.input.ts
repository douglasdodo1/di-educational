import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => [String], { nullable: true })
  phones?: string[];

  @Field(() => String, { nullable: true })
  password?: string;
}
