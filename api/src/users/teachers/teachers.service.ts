import { Injectable } from '@nestjs/common';
import { CreateTeacherInput } from './inputs/create.teacher.input';
import { TeachersRepository } from './teachers.repository';
import { UpdateTeacherInput } from './inputs/update.teacher.input';
import { UsersService } from '../users.service';
import { UserModel } from '../models/users.model';

@Injectable()
export class TeachersService {
  constructor(
    private teachersRepository: TeachersRepository,
    private usersService: UsersService,
  ) {}

  async create(data: CreateTeacherInput): Promise<UserModel> {
    const teacherInput = {
      ...data,
      salary: data.salary,
    };

    const created = await this.teachersRepository.create(teacherInput);
    return created.user as UserModel;
  }

  async findAll(): Promise<UserModel[]> {
    const teachers = await this.teachersRepository.findAll();
    return teachers.map((t) => t.user).filter((u): u is UserModel => !!u);
  }

  async findById(id: number): Promise<UserModel | null> {
    const teacher = await this.teachersRepository.findById(id);
    return teacher?.user ?? null;
  }

  async update(id: number, data: UpdateTeacherInput): Promise<UserModel> {
    const updated = await this.teachersRepository.update(id, data);
    return updated.user as UserModel;
  }

  async delete(id: number): Promise<boolean> {
    await this.teachersRepository.delete(id);
    return true;
  }
}
