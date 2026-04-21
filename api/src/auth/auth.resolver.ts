import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthResponse } from './inputs/auth.response.input';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { CurrentUser } from './decorators/current.user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { UserModel } from 'src/users/models/users.model';
import { JwtRefreshGuard } from './guards/jwt.refresh.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ): Promise<AuthResponse> {
    return this.authService.login(email, password);
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args('data', { type: () => CreateUserInput }) data: CreateUserInput,
  ): Promise<AuthResponse> {
    return this.authService.register(data);
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: UserModel): UserModel {
    return user;
  }

  @Mutation(() => AuthResponse)
  @UseGuards(JwtRefreshGuard)
  refreshToken(@CurrentUser() user: UserModel): AuthResponse {
    return this.authService.refreshToken(user);
  }
}
