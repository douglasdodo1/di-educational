import { BadRequestException, Injectable } from '@nestjs/common';
import { classesRepository } from './classes.repository';
import { UpdateClassInput } from './inputs/update.class.input';
import { UpdateContentInput } from 'src/contents/inputs/update.content.input';

@Injectable()
export class ClassesService {
  constructor(private classesRepository: classesRepository) {}

  async updateClass(classId: number, data: UpdateClassInput): Promise<boolean> {
    try {
      await this.classesRepository.updateClass(classId, data);
      return true;
    } catch {
      throw new BadRequestException('Failed to delete class');
    }
  }

  async deleteClasses(classesIds: number[]): Promise<boolean> {
    try {
      await this.classesRepository.deleteClasses(classesIds);
      return true;
    } catch {
      throw new BadRequestException('Failed to delete classes');
    }
  }

  async updateContent(classId: number, data: UpdateContentInput) {
    try {
      await this.classesRepository.updateContent(classId, data);
      return true;
    } catch {
      throw new BadRequestException('Failed to update content');
    }
  }
}
