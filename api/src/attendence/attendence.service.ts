import { Injectable } from '@nestjs/common';
import { AttendenceModel } from './attendence.model';
import { AttendenceRepository } from './attendence.repository';

@Injectable()
export class AttendenceService {
  constructor(private attendenceRepository: AttendenceRepository) {}

  async findAllByCourseId(courseId: number): Promise<AttendenceModel[]> {
    return this.attendenceRepository.findAllByCourseId(courseId);
  }
}
