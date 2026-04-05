import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserModel } from './models/users.model';
import { UsersRepository } from './users.repository';
import { CreateUserInput } from './inputs/create.user.input';
import { UpdateUserInput } from './inputs/update.user.input';
import { TeachersService } from './teachers/teachers.service';
import { UserRole } from 'src/generated/prisma/enums';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private teachersService: TeachersService,
  ) {}

  async findByEmail(email: string): Promise<UserModel | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: number) {
    return this.usersRepository.findById(id);
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async create(data: CreateUserInput) {
    const hashedPassword = await argon2.hash(data.password);
    if (data.role === UserRole.TEACHER) {
      return this.teachersService.create({
        ...data,
        password: hashedPassword,
      });
    }

    const toCreate = {
      ...data,
      role: UserRole.STUDENT,
      password: hashedPassword,
    };

    return this.usersRepository.create(toCreate);
  }

  async update(id: number, data: UpdateUserInput) {
    const payload: Partial<UpdateUserInput> = { ...data };
    if (data.password) {
      payload.password = await argon2.hash(data.password);
    }
    return this.usersRepository.update(id, payload);
  }

  async verifyPassword(hashed: string, plain: string) {
    return argon2.verify(hashed, plain);
  }

  async delete(id: number): Promise<boolean> {
    await this.usersRepository.delete(id);
    return true;
  }
}
