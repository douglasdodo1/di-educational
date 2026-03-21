import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ContentsModel } from 'src/contents/contents.model';

@ObjectType()
export class ClassModel {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => ContentsModel, { nullable: true })
  content?: ContentsModel | null;
}
