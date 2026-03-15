import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user.model';

@ObjectType()
export class StudentsModel {
  @Field()
  enrollmentNumber!: string;

  @Field(() => User)
  user!: User;
}
