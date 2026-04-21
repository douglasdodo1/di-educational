import { Injectable } from '@nestjs/common';
import { StudentsRepository } from './students.repository';
import { UpdateStudentInput } from './inputs/update.student.input';
import { StudentsModel } from './students.model';
import { CreateUserInput } from '../inputs/create.user.input';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(data: CreateUserInput): Promise<StudentsModel> {
    const enrollmentNumber = `STU${Math.floor(1000 + Math.random() * 9000)}`;
    const phones = data.phones || [];

    if (!enrollmentNumber) {
      throw new Error('Failed to generate enrollment number');
    }

    return await this.studentsRepository.create(data, enrollmentNumber, phones);
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
}
