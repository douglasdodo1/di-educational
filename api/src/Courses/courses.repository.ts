import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseInput } from './inputs/create.course.input';
import { UpdateCourseInput } from './inputs/update.course.input';
import { CoursesModel } from './courses.model';
import { ContentModel } from 'src/contents/contents.model';
import { CreateContentInput } from 'src/contents/inputs/create.content.input';

@Injectable()
export class CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCourseInput, userId: number): Promise<CoursesModel> {
    return await this.prisma.course.create({
      data: { ...data, userId },
      include: {
        adminCourse: { include: { phones: true } },
        members: { include: { phones: true } },
      },
    });
  }

  async findAll(): Promise<CoursesModel[]> {
    return await this.prisma.course.findMany({
      include: {
        adminCourse: { include: { phones: true } },
        members: { include: { phones: true } },
      },
    });
  }

  async findById(id: number): Promise<CoursesModel | null> {
    return await this.prisma.course.findUnique({
      where: { id },
      include: {
        adminCourse: { include: { phones: true } },
        members: { include: { phones: true } },
        contents: true,
      },
    });
  }

  async update(data: UpdateCourseInput, id: number): Promise<void> {
    await this.prisma.course.update({
      where: { id },
      data: {
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }

  async enrollmentStudents(courseId: number, ids: number[]): Promise<void> {
    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        members: {
          connect: ids.map((id) => ({ id })),
        },
      },
    });
  }

  async unrollmentStudents(courseId: number, ids: number[]): Promise<void> {
    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        members: { disconnect: ids.map((id) => ({ id })) },
      },
    });
  }

  async createContent(
    courseId: number,
    data: CreateContentInput,
  ): Promise<ContentModel> {
    return await this.prisma.content.create({
      data: {
        name: data.name,
        description: data?.description,
        courseId,
        type: data.type,
        url: data.url,
      },
    });
  }

  async updateCourseAdmin(courseId: number, userId: number): Promise<void> {
    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        adminCourse: {
          connect: { id: userId },
        },
      },
    });
  }

  async updateIsActive(courseId: number, state: boolean): Promise<void> {
    await this.prisma.course.update({
      where: { id: courseId },
      data: { is_active: state },
    });
  }
}
