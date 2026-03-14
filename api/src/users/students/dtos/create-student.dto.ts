import { Field, InputType } from '@nestjs/graphql';
import { CreateUserDTO } from 'src/users/create-user.dto';

@InputType()
export class CreateStudentDTO extends CreateUserDTO {
  @Field()
  enrollmentNumber!: string;
}
