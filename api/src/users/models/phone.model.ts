import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Phone {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  number!: string;

  @Field(() => Int)
  userId!: number;
}
