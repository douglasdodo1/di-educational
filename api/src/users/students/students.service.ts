import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './inputs/create.student.input';
import { StudentsModel } from './students.model';
import { StudentsRepository } from './students.repository';
import { UpdateStudentInput } from './inputs/update.student.input';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(data: CreateStudentInput): Promise<StudentsModel> {
    return await this.studentsRepository.create(data);
  }

  async findAll(): Promise<StudentsModel[]> {
    return await this.studentsRepository.findAll();
  }

  async findById(id: number): Promise<StudentsModel | null> {
    return await this.studentsRepository.findById(id);
  }

  async update(
    id: number,
    data: UpdateStudentInput,
  ): Promise<StudentsModel | null> {
    return await this.studentsRepository.update(id, data);
  }

  async delete(id: number): Promise<boolean> {
    await this.studentsRepository.delete(id);
    return true;
  }
}
