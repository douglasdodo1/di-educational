import { Injectable } from '@nestjs/common';
import { AttendenceModel } from './attendence.model';
import { AttendenceRepository } from './attendence.repository';
import { CreateAttendenceInput } from './inputs/create.attendence.input';
import { UpdateAttendenceInput } from './inputs/update.attendence.input';

@Injectable()
export class AttendenceService {
  constructor(private attendenceRepository: AttendenceRepository) {}

  async findAllByCourseId(courseId: number): Promise<AttendenceModel[]> {
    return this.attendenceRepository.findAllByCourseId(courseId);
  }

  async create(
    createAttendenceInput: CreateAttendenceInput,
  ): Promise<AttendenceModel> {
    return this.attendenceRepository.create(createAttendenceInput);
  }

  async update(
    editAttendenceInput: UpdateAttendenceInput,
  ): Promise<AttendenceModel> {
    return this.attendenceRepository.update(editAttendenceInput);
  }
}
