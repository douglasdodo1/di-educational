import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';

export enum ContentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  PDF = 'PDF',
}

registerEnumType(ContentType, {
  name: 'ContentType',
});

@ObjectType()
export class ContentModel {
  @Field(() => Int)
  id!: number;

  @Field(() => ContentType)
  type!: ContentType;

  @Field(() => String)
  url!: string;
}
