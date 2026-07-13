import { Injectable } from '@nestjs/common';
import { TimelineModel } from './timeline.model';
import { TimelineRepository } from './timeline.repository';
import { CreateTimelineInput } from './inputs/create.timeline.input';

@Injectable()
export class TimelineService {
  constructor(private timelineRepository: TimelineRepository) {}

  async findAllByCourseId(courseId: number): Promise<TimelineModel[]> {
    return this.timelineRepository.findAllByCourseId(courseId);
  }

  async create(data: CreateTimelineInput): Promise<TimelineModel> {
    return this.timelineRepository.create(data);
  }
}
