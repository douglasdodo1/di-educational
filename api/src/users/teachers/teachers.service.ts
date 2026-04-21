import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './inputs/create.teacher.input';
import { TeachersRepository } from './teachers.repository';
import { UpdateTeacherInput } from './inputs/update.teacher.input';
import { TeacherModel } from './teachers.model';

@Injectable()
export class TeachersService {
  constructor(private teachersRepository: TeachersRepository) {}

  async create(data: CreateTeacherInput): Promise<TeacherModel> {
    const salary = data.salary || 0;
    const phones = data.phones || [];

    const created = await this.teachersRepository.create(data, salary, phones);
    return created;
  }

  async findAll(): Promise<TeacherModel[]> {
    return await this.teachersRepository.findAll();
  }

  async findById(id: number): Promise<TeacherModel | null> {
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
