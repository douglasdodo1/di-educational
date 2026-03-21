import { CreateCourseInput } from './inputs/create.course.input';
import { UpdateCourseInput } from './inputs/update.course.input';
import { CreateClassInput } from 'src/classes/inputs/create.class.input';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CoursesRepository } from './courses.repository';
import { CoursesModel } from './courses.model';

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
    try {
      await this.coursesRepository.update(data, id);
      return true;
    } catch {
      throw new BadRequestException('Failed to delete course');
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.coursesRepository.delete(id);
      return true;
    } catch {
      throw new BadRequestException('Failed to delete course');
    }
  }

  async enrollmentStudents(courseId: number, ids: number[]): Promise<boolean> {
    try {
      await this.coursesRepository.enrollmentStudents(courseId, ids);
      return true;
    } catch {
      throw new BadRequestException('Failed to enroll students in course');
    }
  }

  async unrollmentStudents(courseId: number, ids: number[]): Promise<boolean> {
    try {
      await this.coursesRepository.unrollmentStudents(courseId, ids);
      return true;
    } catch {
      throw new BadRequestException('Failed to unenroll students from course');
    }
  }

  async createClass(
    courseId: number,
    data: CreateClassInput,
  ): Promise<boolean> {
    try {
      await this.coursesRepository.createClass(courseId, data);
      return true;
    } catch {
      throw new BadRequestException('Failed to create class');
    }
  }

  async updateTeacher(courseId: number, id: number): Promise<boolean> {
    try {
      await this.coursesRepository.updateTeacher(courseId, id);
      return true;
    } catch {
      throw new BadRequestException('Failed to update teacher');
    }
  }

  async updateIsActive(courseId: number, state: boolean): Promise<boolean> {
    try {
      await this.coursesRepository.updateIsActive(courseId, state);
      return true;
    } catch {
      throw new BadRequestException('Failed to update teacher');
    }
  }
}
