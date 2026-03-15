import { Injectable } from '@nestjs/common';
import { CreateStudentInput } from './inputs/create-student.input';
import { PrismaService } from 'src/prisma.service';
import { StudentsModel } from './students.model';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentInput): Promise<StudentsModel> {
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
      include: {
        user: true,
      },
    });
  }
}
