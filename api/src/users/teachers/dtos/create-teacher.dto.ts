import { Field, Float, InputType } from '@nestjs/graphql';
import { CreateUserDTO } from 'src/users/create-user.dto';

@InputType()
export class CreateTeacherDTO extends CreateUserDTO {
  @Field(() => Float)
  salary!: number;
}
