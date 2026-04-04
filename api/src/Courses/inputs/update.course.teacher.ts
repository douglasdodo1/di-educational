import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseIsActiveInput {
  @Field(() => Int)
  teacher_id!: number;
}
