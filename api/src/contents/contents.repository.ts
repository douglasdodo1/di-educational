import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateContentInput } from './inputs/create.content.input';
import { UpdateContentInput } from './inputs/update.content.input';

@Injectable()
export class ContentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContentInput) {
    return await this.prisma.content.create({
      data: {
        name: data.name,
        description: data?.description,
        courseId: data.courseId,
        type: data?.type,
        url: data?.url,
      },
    });
  }

  async getContentByID(contentId: number) {
    return this.prisma.content.findUnique({
      where: { id: contentId },
    });
  }

  async updateContent(data: UpdateContentInput) {
    return await this.prisma.content.update({
      where: { id: data.id },
      data: {
        type: data.type,
        url: data.url,
      },
    });
  }

  async deleteContents(contentIds: number[]) {
    await this.prisma.content.deleteMany({
      where: {
        id: { in: contentIds },
      },
    });
  }
}
