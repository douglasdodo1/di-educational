import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponse } from './inputs/auth.response.input';
import { StudentsService } from 'src/users/students/students.service';
import { CreateUserInput } from 'src/users/inputs/create.user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private studentService: StudentsService,
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
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: user,
    };

    return response;
  }

  async register(data: CreateUserInput) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    const createdUser = await this.studentService.create(data);
    if (!createdUser || !createdUser.user) {
      throw new UnauthorizedException('Failed to create user');
    }

    const payload = {
      sub: createdUser.user.id,
      email: createdUser.user.email,
    };

    const response: AuthResponse = {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: createdUser.user,
    };

    return response;
  }
}
