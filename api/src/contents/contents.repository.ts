import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateContentInput } from './inputs/update.content.input';

@Injectable()
export class ContentsRepository {
  constructor(private prisma: PrismaService) {}

  async getContentByID(contentId: number) {
    return this.prisma.content.findUnique({
      where: { id: contentId },
    });
  }

  async updateContent(contentId: number, data: UpdateContentInput) {
    await this.prisma.content.update({
      where: { id: contentId },
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
