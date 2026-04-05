import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StudentsModel } from './students.model';
import { UpdateStudentInput } from './inputs/update.student.input';
import { CreateUserInput } from '../inputs/create.user.input';

@Injectable()
export class StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateUserInput,
    enrollmentNumber: string,
  ): Promise<StudentsModel> {
    return await this.prisma.student.create({
      data: {
        enrollmentNumber: enrollmentNumber,
        user: {
          create: {
            email: data.email,
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

  async findAll(): Promise<StudentsModel[]> {
    return await this.prisma.student.findMany({
      include: { user: { include: { phones: true } } },
    });
  }

  async findById(id: number): Promise<StudentsModel | null> {
    return await this.prisma.student.findUnique({
      where: { id },
      include: { user: { include: { phones: true } } },
    });
  }

  async update(id: number, data: UpdateStudentInput): Promise<StudentsModel> {
    return await this.prisma.student.update({
      where: { id },
      data: {
        enrollmentNumber: data.enrollmentNumber,
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
    await this.prisma.student.delete({ where: { id } });
  }
}
