import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseInput } from './inputs/create.course.input';
import { UpdateCourseInput } from './inputs/update.course.input';
import { CreateClassInput } from 'src/classes/inputs/create.class.input';

@Injectable()
export class CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCourseInput, teacherId: number) {
    return await this.prisma.course.create({
      data: { ...data, teacherId },
      include: {
        teacher: { include: { user: { include: { phones: true } } } },
        members: { include: { phones: true } },
      },
    });
  }

  async findAll() {
    return await this.prisma.course.findMany({
      include: {
        teacher: { include: { user: { include: { phones: true } } } },
        members: { include: { phones: true } },
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.course.findUnique({
      where: { id },
      include: {
        teacher: { include: { user: { include: { phones: true } } } },
        members: { include: { phones: true } },
      },
    });
  }

  async update(data: UpdateCourseInput, id: number) {
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

  async delete(id: number) {
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

  async unrollmentStudents(courseId: number, ids: number[]) {
    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        members: { disconnect: ids.map((id) => ({ id })) },
      },
    });
  }

  async createClass(courseId: number, data: CreateClassInput) {
    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        classes: {
          create: {
            name: data.name,
            description: data.description,
            content: {
              create: {
                type: data.content.type,
                url: data.content.url,
              },
            },
          },
        },
      },
    });
  }

  async updateTeacher(courseId: number, id: number) {
    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        teacher: {
          connect: { id },
        },
      },
    });
  }

  async updateIsActive(courseId: number, state: boolean) {
    await this.prisma.course.update({
      where: { id: courseId },
      data: {
        is_active: state,
      },
    });
  }
}
