import { Field, Float, ObjectType, Int } from '@nestjs/graphql';
import { UserModel } from '../models/users.model';

@ObjectType()
export class TeacherModel {
  @Field(() => Int)
  id!: number;

  @Field(() => Float)
  salary!: number;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel | null;
}
