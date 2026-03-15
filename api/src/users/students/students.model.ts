import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../models/user.model';

@ObjectType()
export class StudentsModel {
  @Field()
  enrollmentNumber!: string;

  @Field(() => User)
  user!: User;
}
