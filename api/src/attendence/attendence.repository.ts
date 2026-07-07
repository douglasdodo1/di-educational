import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AttendenceModel } from './attendence.model';

@Injectable()
export class AttendenceRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByCourseId(courseId: number): Promise<AttendenceModel[]> {
    return await this.prisma.attendence.findMany({
      where: { courseId: courseId },
      include: {
        frequencies: true,
      },
    });
  }
}
