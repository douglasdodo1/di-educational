import { Field, InputType } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';
import { ContentType } from 'src/generated/prisma/enums';

@InputType()
export class CreateContentInput {
  @Field(() => String)
  @Length(3, 150)
  name!: string;

  @Field(() => String, { nullable: true })
  @MaxLength(500)
  description?: string;

  @Field(() => String)
  type!: ContentType;

  @Field(() => String)
  @MaxLength(500)
  url!: string;
}
