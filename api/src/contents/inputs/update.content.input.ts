import { Field, InputType } from '@nestjs/graphql';
import { ContentType } from 'src/generated/prisma/enums';

@InputType()
export class UpdateContentInput {
  @Field(() => ContentType, { nullable: true })
  type?: ContentType;

  @Field(() => String, { nullable: true })
  url?: string;
}
