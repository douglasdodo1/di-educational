import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateClassInput } from './inputs/create.class.input';

@Injectable()
export class classesRepository {
  constructor(private prisma: PrismaService) {}

  async updateClass(classId: number, data: CreateClassInput) {
    await this.prisma.class.update({
      where: { id: classId },
      data: {
        name: data.name,
        description: data.description,
        content: {
          create: data.content,
        },
      },
      include: { content: true },
    });
  }

  async deleteClasses(classesIds: number[]) {
    await this.prisma.class.deleteMany({
      where: {
        id: { in: classesIds },
      },
    });
  }
}
