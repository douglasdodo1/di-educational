import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FrequencyModel {
  @Field(() => Int)
  id!: number;

  @Field(() => Boolean)
  is_present!: boolean;

  @Field(() => Int)
  attendenceId!: number;

  @Field(() => Int)
  studentId!: number;
}
