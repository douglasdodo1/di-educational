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
    const teacherInput = {
      ...data,
      salary: data.salary,
    };

    return await this.teachersRepository.create(teacherInput);
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
