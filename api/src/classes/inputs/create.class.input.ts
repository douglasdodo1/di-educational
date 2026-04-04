import { Field, InputType } from '@nestjs/graphql';
import { IsObject, Length, MaxLength } from 'class-validator';
import { CreateContentInput } from 'src/contents/inputs/create.content.input';

@InputType()
export class CreateClassInput {
  @Field(() => String)
  @Length(3, 150)
  name!: string;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  description?: string;

  @Field(() => CreateContentInput)
  @IsObject()
  content!: CreateContentInput;
}
