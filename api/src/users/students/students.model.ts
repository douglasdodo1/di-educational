import { Field, ObjectType, Int } from '@nestjs/graphql';
import { UserModel } from '../models/users.model';

@ObjectType()
export class StudentsModel {
  @Field(() => Int)
  id!: number;

  @Field()
  enrollmentNumber!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel | null;
}
