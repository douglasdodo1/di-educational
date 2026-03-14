import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  email!: string;

  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field({ nullable: true })
  bio?: string;

  @Field()
  password!: string;
}
