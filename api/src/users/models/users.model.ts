import { Field, ObjectType, Int, HideField } from '@nestjs/graphql';
import { Phone } from './phone.model';
import { TeacherModel } from '../teachers/teachers.model';
import { StudentsModel } from '../students/students.model';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  first_name!: string;

  @Field(() => String)
  last_name!: string;

  @Field(() => TeacherModel, { nullable: true })
  teacher?: TeacherModel | null;

  @Field(() => StudentsModel, { nullable: true })
  student?: StudentsModel | null;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => [Phone])
  phones!: Phone[];

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null;

  @HideField()
  password!: string;
}
