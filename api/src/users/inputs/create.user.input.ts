import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  MaxLength,
  MinLength,
  IsArray,
  ArrayNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(3)
  @MaxLength(50)
  first_name!: string;

  @Field()
  @MinLength(3)
  @MaxLength(50)
  last_name!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(200)
  bio?: string;

  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  phones!: string[];

  @Field()
  @MinLength(6)
  @MaxLength(50)
  password!: string;
}
