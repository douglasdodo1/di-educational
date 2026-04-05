import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/generated/prisma/enums';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  first_name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  last_name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(200)
  bio?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phones?: string[];

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(6)
  @MaxLength(50)
  password?: string;
}
