import { Field, ObjectType, Int } from '@nestjs/graphql';
import { AttendenceModel } from 'src/attendence/attendence.model';
import { ContentModel } from 'src/contents/contents.model';
import { UserModel } from 'src/users/models/users.model';

@ObjectType()
export class CoursesModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => Date)
  start_date!: Date;

  @Field(() => Date)
  end_date!: Date;

  @Field(() => UserModel, { nullable: true })
  adminCourse!: UserModel;

  @Field(() => [UserModel], { nullable: true })
  members!: UserModel[];

  @Field(() => [ContentModel], { nullable: true })
  contents?: ContentModel[];

  @Field(() => [AttendenceModel], { nullable: true })
  attendences?: AttendenceModel[];
}
