import { Injectable } from '@nestjs/common';
import { TimelineModel } from './timeline.model';
import { TimelineRepository } from './timeline.repository';
import { CreateTimelineInput } from './inputs/create.timeline.input';
import { EditTimelineInput } from './inputs/edit.timeline.input';
import { EditTimelineIsDoneInput } from './inputs/edit.isdone.timeline.input';

@Injectable()
export class TimelineService {
  constructor(private timelineRepository: TimelineRepository) {}

  async findAllByCourseId(courseId: number): Promise<TimelineModel[]> {
    return this.timelineRepository.findAllByCourseId(courseId);
  }

  async create(data: CreateTimelineInput): Promise<TimelineModel> {
    return this.timelineRepository.create(data);
  }

  async update(id: number, data: EditTimelineInput): Promise<TimelineModel> {
    return this.timelineRepository.update(id, data);
  }

  async updateIsDone(
    id: number,
    data: EditTimelineIsDoneInput,
  ): Promise<TimelineModel> {
    return this.timelineRepository.updateIsDone(id, data);
  }

  async delete(id: number): Promise<boolean> {
    await this.timelineRepository.delete(id);
    return true;
  }
}
