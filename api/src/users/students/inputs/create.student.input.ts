import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from 'src/users/inputs/create.user.input';

@InputType()
export class CreateStudentInput extends CreateUserInput {
  @Field()
  enrollmentNumber!: string;
}
