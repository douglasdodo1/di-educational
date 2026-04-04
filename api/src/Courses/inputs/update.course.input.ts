import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateCourseInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(3)
  @MaxLength(150)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  start_date?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  end_date?: Date;
}
