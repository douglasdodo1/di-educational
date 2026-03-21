import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateClassInput } from './inputs/update.class.input';

@Injectable()
export class classesRepository {
  constructor(private prisma: PrismaService) {}

  async updateClass(classId: number, data: UpdateClassInput) {
    await this.prisma.class.update({
      where: { id: classId },
      data: {
        name: data.name,
        description: data.description,
      },
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
