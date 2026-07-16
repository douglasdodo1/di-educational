import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';
import { ContentType } from 'src/generated/prisma/enums';

@InputType()
export class UpdateContentInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(3, 150)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @Field(() => ContentType, { nullable: true })
  @IsOptional()
  type?: ContentType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(500)
  url?: string;
}
