import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ContentType } from 'src/generated/prisma/enums';

@ObjectType()
export class ContentModel {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string | null;

  @Field(() => Int)
  courseId!: number;

  @Field(() => ContentType)
  type!: ContentType;

  @Field()
  url!: string;
}
