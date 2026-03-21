import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../models/users.model';

@ObjectType()
export class StudentsModel {
  @Field()
  enrollmentNumber!: string;

  @Field(() => UserModel)
  user!: UserModel;
}
