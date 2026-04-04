import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './models/users.model';
import { CreateUserInput } from './inputs/create.user.input';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserModel])
  users(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Query(() => UserModel, { nullable: true })
  user(@Args('id') id: number): Promise<UserModel | null> {
    return this.usersService.findById(id);
  }

  @Query(() => UserModel, { nullable: true })
  userByEmail(@Args('email') email: string): Promise<UserModel | null> {
    return this.usersService.findByEmail(email);
  }

  @Mutation(() => UserModel)
  createUser(@Args('data') data: CreateUserInput): Promise<UserModel> {
    return this.usersService.create(data);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id') id: number): Promise<boolean> {
    return this.usersService.delete(id);
  }
}
