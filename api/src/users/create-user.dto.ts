import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDTO {
  @Field()
  email!: string;

  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field({ nullable: true })
  bio?: string;

  @Field()
  password!: string;
}
