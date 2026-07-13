import { Injectable } from '@nestjs/common';
import { TimelineModel } from './timeline.model';
import { TimelineRepository } from './timeline.repository';

@Injectable()
export class TimelineService {
  constructor(private timelineRepository: TimelineRepository) {}

  async findAllByCourseId(courseId: number): Promise<TimelineModel[]> {
    return this.timelineRepository.findAllByCourseId(courseId);
  }
}
