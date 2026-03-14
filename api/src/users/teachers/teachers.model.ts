import { Field, Float, ObjectType } from '@nestjs/graphql';
import { User } from '../user.model';

@ObjectType()
export class TeacherModel extends User {
  @Field(() => Float)
  salary!: number;

  @Field(() => User)
  user!: User;
}
