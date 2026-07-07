import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FrequencyModel } from './frequency.model';

@Injectable()
export class FrequencyRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByAttendenceId(attendenceId: number): Promise<FrequencyModel[]> {
    return await this.prisma.frequency.findMany({
      where: { attendenceId: attendenceId },
      include: {
        attendence: true,
        student: {
          include: {
            user: true,
          },
        },
      },
    });
  }
}
