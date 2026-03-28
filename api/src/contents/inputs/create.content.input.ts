import { Field, InputType } from '@nestjs/graphql';
import { ContentType } from 'src/generated/prisma/enums';

@InputType()
export class CreateContentInput {
  @Field(() => ContentType)
  type!: ContentType;

  @Field(() => String)
  url!: string;
}
