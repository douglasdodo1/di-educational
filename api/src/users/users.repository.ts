import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './inputs/create.user.input';
import { UpdateUserInput } from './inputs/update.user.input';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        phones: true,
        student: true,
        teacher: true,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: { phones: true, student: true, teacher: true },
    });
  }

  async create(data: CreateUserInput) {
    return await this.prisma.user.create({
      data: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        bio: data.bio,
        password: data.password,
        phones: {
          create: data.phones.map((number) => ({ number })),
        },
      },
      include: { phones: true, student: true, teacher: true },
    });
  }

  async update(id: number, data: Partial<UpdateUserInput>) {
    return await this.prisma.user.update({
      where: { id },
      data: {
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
      include: { phones: true, student: true, teacher: true },
    });
  }

  async delete(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
