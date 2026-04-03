import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/users/models/users.model';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  access_token!: string;

  @Field(() => String)
  refresh_token!: string;

  @Field(() => UserModel)
  user!: UserModel;
}
