import { CreateCourseInput } from './inputs/create.course.input';
import { UpdateCourseInput } from './inputs/update.course.input';
import { CreateClassInput } from 'src/classes/inputs/create.class.input';
import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CoursesModel } from './courses.model';
import { ClassModel } from 'src/classes/classes.model';

@Injectable()
export class CoursesService {
  constructor(private coursesRepository: CoursesRepository) {}

  async create(data: CreateCourseInput): Promise<CoursesModel> {
    return await this.coursesRepository.create(data, 1);
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

  async createClass(
    courseId: number,
    data: CreateClassInput,
  ): Promise<ClassModel> {
    return await this.coursesRepository.createClass(courseId, data);
  }

  async updateTeacher(courseId: number, id: number): Promise<boolean> {
    await this.coursesRepository.updateTeacher(courseId, id);
    return true;
  }

  async updateIsActive(courseId: number, state: boolean): Promise<boolean> {
    await this.coursesRepository.updateIsActive(courseId, state);
    return true;
  }
}
