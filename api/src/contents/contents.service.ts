import { Injectable } from '@nestjs/common';
import { ContentsRepository } from './contents.repository';
import { ContentModel } from './contents.model';
import { UpdateContentInput } from './inputs/update.content.input';

@Injectable()
export class ContentsService {
  constructor(private contentsRepository: ContentsRepository) {}

  async getContentByID(contentId: number): Promise<ContentModel | null> {
    return this.contentsRepository.getContentByID(contentId);
  }

  async updateContent(
    contentId: number,
    data: UpdateContentInput,
  ): Promise<boolean> {
    await this.contentsRepository.updateContent(contentId, data);
    return true;
  }

  async deleteContents(contentIds: number[]): Promise<boolean> {
    await this.contentsRepository.deleteContents(contentIds);
    return true;
  }
}
