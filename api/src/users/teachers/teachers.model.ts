import { Field, Float, ObjectType, Int } from '@nestjs/graphql';
import { User } from '../models/user.model';

@ObjectType()
export class TeacherModel {
  @Field(() => Int)
  id!: number;

  @Field(() => Float)
  salary!: number;

  @Field(() => User)
  user!: User;
}
