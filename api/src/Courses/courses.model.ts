import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ClassModel } from 'src/classes/classes.model';
import { StudentsModel } from 'src/users/students/students.model';
import { TeacherModel } from 'src/users/teachers/teachers.model';

@ObjectType()
export class CoursesModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => Date)
  start_date!: Date;

  @Field(() => Date)
  end_date!: Date;

  @Field(() => TeacherModel, { nullable: true })
  teacher!: TeacherModel;

  @Field(() => [StudentsModel], { nullable: true })
  members!: StudentsModel[];

  @Field(() => [ClassModel], { nullable: true })
  classes?: ClassModel[];
}
