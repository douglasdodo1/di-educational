import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsUrl, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @Field(() => String)
  @Length(3, 150)
  name!: string;

  @Field(() => String, { nullable: true })
  @IsUrl()
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @Field(() => Boolean)
  is_active!: boolean;

  @Field(() => Date)
  @IsDate()
  start_date!: Date;

  @Field(() => Date)
  @IsDate()
  end_date!: Date;
}
