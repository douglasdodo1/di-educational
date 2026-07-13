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
    });
  }
}
