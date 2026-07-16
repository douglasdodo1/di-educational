import { CreateCourseInput } from './inputs/create.course.input';
import { UpdateCourseInput } from './inputs/update.course.input';
import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CoursesModel } from './courses.model';
import { UserModel } from 'src/users/models/users.model';
import { UserRole } from 'src/generated/prisma/enums';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CoursesRepository) {}

  async create(
    data: CreateCourseInput,
    user: UserModel,
  ): Promise<CoursesModel> {
    if (user.role === UserRole.STUDENT) {
      throw new Error('Students cannot create courses');
    }

    return await this.coursesRepository.create(data, user.id);
  }

  async findAll(): Promise<CoursesModel[]> {
    return await this.coursesRepository.findAll();
  }

  async findById(id: number): Promise<CoursesModel | null> {
    return await this.coursesRepository.findById(id);
  }

  async update(id: number, data: UpdateCourseInput): Promise<boolean> {
    await this.coursesRepository.update(data, id);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.coursesRepository.delete(id);
    return true;
  }

  async enrollmentStudents(courseId: number, ids: number[]): Promise<boolean> {
    await this.coursesRepository.enrollmentStudents(courseId, ids);
    return true;
  }

  async unrollmentStudents(courseId: number, ids: number[]): Promise<boolean> {
    await this.coursesRepository.unrollmentStudents(courseId, ids);
    return true;
  }

  async updateTeacher(courseId: number, id: number): Promise<boolean> {
    await this.coursesRepository.updateCourseAdmin(courseId, id);
    return true;
  }

  async updateIsActive(courseId: number, state: boolean): Promise<boolean> {
    await this.coursesRepository.updateIsActive(courseId, state);
    return true;
  }
}
