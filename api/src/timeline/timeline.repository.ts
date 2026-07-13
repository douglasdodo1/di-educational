import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimelineModel } from './timeline.model';

@Injectable()
export class TimelineRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByCourseId(courseId: number): Promise<TimelineModel[]> {
    return await this.prisma.timeline.findMany({
      where: { courseId: courseId },
      include: {
        content: true,
      },
      orderBy: {
        date: 'asc',
      },
    });
  }

  async create(data: {
    date: Date;
    is_done: boolean;
    courseId: number;
    contentId?: number | null;
  }): Promise<TimelineModel> {
    return await this.prisma.timeline.create({
      data,
      include: {
        content: true,
      },
    });
  }
}
