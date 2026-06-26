import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthResponse } from './inputs/auth.response.input';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { CurrentUser } from './decorators/current.user.decorator';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtRefreshGuard } from './guards/jwt.refresh.guard';
import { UserModel } from 'src/users/models/users.model';
import { SetAuthCookiesInterceptor } from './interceptors/set-auth-cookies.interceptor';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @UseInterceptors(SetAuthCookiesInterceptor)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AuthResponse> {
    return this.authService.login(email, password);
  }

  @Mutation(() => AuthResponse)
  @UseInterceptors(SetAuthCookiesInterceptor)
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
