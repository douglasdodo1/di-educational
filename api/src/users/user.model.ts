// user.model.ts
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  first_name!: string;

  @Field(() => String)
  last_name!: string;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null;

  @Field(() => String)
  password!: string;
}
