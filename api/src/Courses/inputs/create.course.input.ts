import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
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
}
