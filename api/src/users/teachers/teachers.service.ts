import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './inputs/create.teacher.input';
import { TeachersRepository } from './teachers.repository';
import { UpdateTeacherInput } from './inputs/update.teacher.input';
import { TeacherModel } from './teachers.model';
import { UsersService } from '../users.service';

@Injectable()
export class TeachersService {
  constructor(
    private teachersRepository: TeachersRepository,
    private usersService: UsersService,
  ) {}

  async create(data: CreateTeacherInput): Promise<TeacherModel> {
    const { email, password, first_name, last_name, bio, phones } = data;

    const user = await this.usersService.create({
      email,
      password,
      first_name,
      last_name,
      bio,
      phones,
    });

    return await this.teachersRepository.createWithUserId(user.id, data.salary);
  }

  async findAll() {
    return await this.teachersRepository.findAll();
  }

  async findById(id: number) {
    return await this.teachersRepository.findById(id);
  }

  async update(id: number, data: UpdateTeacherInput): Promise<boolean> {
    await this.teachersRepository.update(id, data);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.teachersRepository.delete(id);
    return true;
  }
}
