import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxLength,
} from 'class-validator';
import { ContentType } from 'src/generated/prisma/enums';

@InputType()
export class CreateContentInput {
  @Field(() => String)
  @Length(3, 150)
  name!: string;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  description?: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  courseId!: number;

  @Field(() => ContentType)
  @IsEnum(ContentType)
  @IsNotEmpty()
  type!: ContentType;

  @Field(() => String)
  @MaxLength(500)
  url!: string;
}
