import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeacherInput } from './inputs/create.teacher.input';
import { TeacherModel } from './teachers.model';
import { UpdateTeacherInput } from './inputs/update.teacher.input';

@Injectable()
export class TeachersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTeacherInput): Promise<TeacherModel> {
    return await this.prisma.teacher.create({
      data: {
        salary: data.salary,
        user: {
          create: {
            email: data.email,
            salary: data.salary,
            first_name: data.first_name,
            last_name: data.last_name,
            bio: data.bio,
            phones: {
              create: data.phones.map((number) => ({ number })),
            },
            password: data.password,
          },
        },
      },
      include: { user: { include: { phones: true } } },
    });
  }

  async findAll(): Promise<TeacherModel[]> {
    return await this.prisma.teacher.findMany({
      include: { user: { include: { phones: true } } },
    });
  }

  async findById(id: number): Promise<TeacherModel | null> {
    return await this.prisma.teacher.findUnique({
      where: { id },
      include: { user: { include: { phones: true } } },
    });
  }

  async update(id: number, data: UpdateTeacherInput): Promise<TeacherModel> {
    return await this.prisma.teacher.update({
      where: { id },
      data: {
        salary: data.salary,
        user: {
          update: {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            bio: data.bio,
            password: data.password,
            phones: data.phones
              ? {
                  deleteMany: {},
                  create: data.phones.map((number) => ({ number })),
                }
              : undefined,
          },
        },
      },
      include: { user: { include: { phones: true } } },
    });
  }

  async delete(id: number) {
    await this.prisma.teacher.delete({ where: { id } });
  }

  async createWithUserId(
    userId: number,
    salary: number,
  ): Promise<TeacherModel> {
    return await this.prisma.teacher.create({
      data: {
        id: userId,
        salary,
      },
      include: { user: { include: { phones: true } } },
    });
  }
}
