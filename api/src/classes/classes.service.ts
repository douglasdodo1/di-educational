import { Injectable } from '@nestjs/common';
import { classesRepository } from './classes.repository';
import { UpdateClassInput } from './inputs/update.class.input';
import { UpdateContentInput } from 'src/contents/inputs/update.content.input';

@Injectable()
export class ClassesService {
  constructor(private classesRepository: classesRepository) {}

  async updateClass(classId: number, data: UpdateClassInput): Promise<boolean> {
    await this.classesRepository.updateClass(classId, data);
    return true;
  }

  async deleteClasses(classesIds: number[]): Promise<boolean> {
    await this.classesRepository.deleteClasses(classesIds);
    return true;
  }

  async updateContent(classId: number, data: UpdateContentInput) {
    await this.classesRepository.updateContent(classId, data);
    return true;
  }
}
