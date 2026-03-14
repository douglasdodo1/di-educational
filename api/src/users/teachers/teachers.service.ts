import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTeacherDTO } from './dtos/create-teacher.dto';
import type { Teacher } from 'src/generated/prisma/client';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTeacherDTO): Promise<Teacher> {
    return await this.prisma.teacher.create({
      data: {
        salary: data.salary,
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
