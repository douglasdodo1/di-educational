import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseIsActiveInput {
  @Field(() => Int)
  id!: number;

  @Field(() => Boolean)
  is_active!: boolean;
}
