import { Field, Float, InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/inputs/create.user.input';

@InputType()
export class CreateTeacherInput extends CreateUserInput {
  @Field(() => Float)
  salary!: number;
}
