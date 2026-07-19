import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AttendenceModel } from './attendence.model';
import { CreateAttendenceInput } from './inputs/create.attendence.input';
import { UpdateAttendenceInput } from './inputs/update.attendence.input';

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

  async create(
    createAttendenceInput: CreateAttendenceInput,
  ): Promise<AttendenceModel> {
    return await this.prisma.attendence.create({
      data: createAttendenceInput,
    });
  }

  async update(
    editAttendenceInput: UpdateAttendenceInput,
  ): Promise<AttendenceModel> {
    return await this.prisma.attendence.update({
      where: { id: editAttendenceInput.id },
      data: editAttendenceInput,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.attendence.delete({
      where: { id },
    });
  }
}
