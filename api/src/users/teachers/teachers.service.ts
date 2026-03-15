import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './inputs/create.teacher.input';
import { TeachersRepository } from './teachers.repository';
import { TeacherModel } from './teachers.model';
import { UpdateTeacherInput } from './inputs/update.teacher.input';

@Injectable()
export class TeachersService {
  constructor(private teachersRepository: TeachersRepository) {}

  async create(data: CreateTeacherInput): Promise<TeacherModel> {
    return await this.teachersRepository.create(data);
  }

  async findAll(): Promise<TeacherModel[]> {
    return await this.teachersRepository.findAll();
  }

  async findById(id: number): Promise<TeacherModel | null> {
    return await this.teachersRepository.findById(id);
  }

  async update(
    id: number,
    data: UpdateTeacherInput,
  ): Promise<TeacherModel | null> {
    return await this.teachersRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    await this.teachersRepository.delete(id);
    return true;
  }
}
