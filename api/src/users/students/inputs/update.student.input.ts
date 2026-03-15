import { Field, InputType } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/users/inputs/update-user-input';

@InputType()
export class UpdateStudentInput extends UpdateUserInput {
  @Field(() => String, { nullable: true })
  enrollmentNumber?: string;
}
