import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateClassInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(3, 150)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
