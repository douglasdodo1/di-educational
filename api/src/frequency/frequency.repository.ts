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

  async setFrequency(
    frequencyId: number,
    isPresent: boolean,
  ): Promise<FrequencyModel> {
    const response = await this.prisma.frequency.update({
      where: { id: frequencyId },
      data: { is_present: isPresent },
    });
    return response;
  }

  async setAllFrequencies(
    attendenceId: number,
    isPresent: boolean,
  ): Promise<FrequencyModel[]> {
    await this.prisma.frequency.updateMany({
      where: { attendenceId: attendenceId },
      data: { is_present: isPresent },
    });

    return await this.findAllByAttendenceId(attendenceId);
  }
}
