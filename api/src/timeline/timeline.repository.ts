import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TimelineModel } from './timeline.model';
import { EditTimelineInput } from './inputs/edit.timeline.input';
import { CreateTimelineInput } from './inputs/create.timeline.input';
import { EditTimelineIsDoneInput } from './inputs/edit.isdone.timeline.input';

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

  async create(data: CreateTimelineInput): Promise<TimelineModel> {
    return await this.prisma.timeline.create({
      data,
      include: {
        content: true,
      },
    });
  }

  async update(id: number, data: EditTimelineInput): Promise<TimelineModel> {
    return await this.prisma.timeline.update({
      where: { id },
      data,
      include: {
        content: true,
      },
    });
  }

  async updateIsDone(
    id: number,
    data: EditTimelineIsDoneInput,
  ): Promise<TimelineModel> {
    return await this.prisma.timeline.update({
      where: { id },
      data,
      include: {
        content: true,
      },
    });
  }
}
