import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './inputs/create.student.input';
import { StudentsRepository } from './students.repository';
import { UpdateStudentInput } from './inputs/update.student.input';
import { StudentsModel } from './students.model';

@Injectable()
export class StudentsService {
  constructor(private studentsRepository: StudentsRepository) {}

  async create(data: CreateStudentInput): Promise<StudentsModel> {
    const enrollmentNumber = `STU${Math.floor(1000 + Math.random() * 9000)}`;
    const studentInput = {
      ...data,
      enrollmentNumber,
    };
    return await this.studentsRepository.create(studentInput);
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
