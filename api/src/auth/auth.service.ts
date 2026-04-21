import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponse } from './inputs/auth.response.input';
import { CreateUserInput } from 'src/users/inputs/create.user.input';
import { UserModel } from 'src/users/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await this.usersService.verifyPassword(
      user.password,
      password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const profile = user.student ?? user.teacher;

    if (!profile) {
      throw new UnauthorizedException('User profile not found');
    }

    const payload = { sub: user.id, email: user.email };

    const response: AuthResponse = {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
      user: user,
    };

    return response;
  }

  async register(data: CreateUserInput) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const createdProfile = await this.usersService.create(data);
    if (!createdProfile || !createdProfile.user) {
      throw new UnauthorizedException('Failed to create user');
    }

    const user = createdProfile.user;

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const response: AuthResponse = {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
      user,
    };

    return response;
  }

  refreshToken(user: UserModel): AuthResponse {
    const payload = { sub: user.id, email: user.email };

    const response: AuthResponse = {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
      user,
    };

    return response;
  }
}
