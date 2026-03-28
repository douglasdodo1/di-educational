import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './inputs/create.teacher.input';
import { TeachersRepository } from './teachers.repository';
import { UpdateTeacherInput } from './inputs/update.teacher.input';
import { TeacherModel } from './teachers.model';

@Injectable()
export class TeachersService {
  constructor(private teachersRepository: TeachersRepository) {}

  async create(data: CreateTeacherInput): Promise<TeacherModel> {
    return await this.teachersRepository.create(data);
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
