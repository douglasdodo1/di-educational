import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CoursesModel } from 'src/Courses/courses.model';
import { ContentModel } from 'src/contents/contents.model';

@ObjectType()
export class TimelineModel {
  @Field(() => Int)
  id!: number;

  @Field(() => Boolean)
  is_done!: boolean;

  @Field(() => Date)
  date!: Date;

  @Field(() => Int)
  courseId!: number;

  @Field(() => Int, { nullable: true })
  contentId?: number | null;

  @Field(() => CoursesModel, { nullable: true })
  course?: CoursesModel;

  @Field(() => ContentModel, { nullable: true })
  content?: ContentModel | null;
}
