import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import { ContentType } from 'src/generated/prisma/enums'; // 👈

registerEnumType(ContentType, {
  name: 'ContentType',
});

@ObjectType()
export class ContentsModel {
  @Field(() => Int)
  id!: number;

  @Field(() => ContentType)
  type!: ContentType;

  @Field(() => String)
  url!: string;
}
