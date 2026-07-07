import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AttendenceModel } from 'src/attendence/attendence.model';
import { StudentsModel } from 'src/users/students/students.model';

@ObjectType()
export class FrequencyModel {
  @Field(() => Int)
  id!: number;

  @Field(() => Boolean)
  is_present!: boolean;

  @Field(() => Int)
  attendenceId!: number;

  @Field(() => AttendenceModel, { nullable: true })
  attendence?: AttendenceModel | null;

  @Field(() => StudentsModel, { nullable: true })
  student?: StudentsModel | null;
}
