import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './inputs/create.student.input';
import { StudentsRepository } from './students.repository';
import { UpdateStudentInput } from './inputs/update.student.input';
import { StudentsModel } from './students.model';
import { UsersService } from '../users.service';

@Injectable()
export class StudentsService {
  constructor(
    private studentsRepository: StudentsRepository,
    private usersService: UsersService,
  ) {}

  async create(data: CreateStudentInput): Promise<StudentsModel> {
    const { email, password, first_name, last_name, bio, phones } = data;

    const user = await this.usersService.create({
      email,
      password,
      first_name,
      last_name,
      bio,
      phones,
    });

    return await this.studentsRepository.createWithUserId(
      user.id,
      data.enrollmentNumber,
    );
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
