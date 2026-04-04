import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseIsActiveInput {
  @Field(() => Boolean)
  is_active!: boolean;
}
