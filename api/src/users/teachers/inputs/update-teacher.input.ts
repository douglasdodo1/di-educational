import { Field, Float, InputType } from '@nestjs/graphql';
import { UpdateUserInput } from 'src/users/inputs/update-user-input';

@InputType()
export class UpdateTeacherInput extends UpdateUserInput {
  @Field(() => Float, { nullable: true })
  salary?: number;
}
