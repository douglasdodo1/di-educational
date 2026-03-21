import { Field, InputType, Int } from '@nestjs/graphql';
import { ContentType } from 'src/generated/prisma/enums';

@InputType()
export class UpdateContentInput {
  @Field(() => Int)
  id!: number;

  @Field(() => ContentType, { nullable: true })
  type?: ContentType;

  @Field(() => String, { nullable: true })
  url?: string;
}
