import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  first_name!: string;

  @Field(() => String)
  last_name!: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => String)
  password!: string;
}
