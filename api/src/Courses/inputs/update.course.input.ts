import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseInput {
  @Field(() => Int)
  id!: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Date, { nullable: true })
  start_date?: Date;

  @Field(() => Date, { nullable: true })
  end_date?: Date;
}
