import { Injectable } from '@nestjs/common';
import { CreateStudentDTO } from './dtos/create-student.dto';
import { PrismaService } from 'src/prisma.service';
import type { Student } from 'src/generated/prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDTO): Promise<Student> {
    return await this.prisma.student.create({
      data: {
        enrollmentNumber: data.enrollmentNumber,
        user: {
          create: {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            bio: data.bio,
            password: data.password,
          },
        },
      },
    });
  }
}
