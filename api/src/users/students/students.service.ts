import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './inputs/create.student.input';
import { StudentsRepository } from './students.repository';
import { UpdateStudentInput } from './inputs/update.student.input';
import { StudentsModel } from './students.model';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(data: CreateStudentInput): Promise<StudentsModel> {
    return await this.studentsRepository.create(data);
  }

  async findAll() {
    return await this.studentsRepository.findAll();
  }

  async findById(id: number) {
    return await this.studentsRepository.findById(id);
  }

  async update(id: number, data: UpdateStudentInput): Promise<boolean> {
    await this.studentsRepository.update(id, data);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.studentsRepository.delete(id);
    return true;
  }
}
