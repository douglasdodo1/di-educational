import { Injectable } from '@nestjs/common';
import { ContentsRepository } from './contents.repository';
import { ContentModel } from './contents.model';
import { CreateContentInput } from './inputs/create.content.input';
import { UpdateContentInput } from './inputs/update.content.input';

@Injectable()
export class ContentsService {
  constructor(private contentsRepository: ContentsRepository) {}

  async create(data: CreateContentInput): Promise<ContentModel> {
    return await this.contentsRepository.create(data);
  }

  async getContentByID(contentId: number): Promise<ContentModel | null> {
    return this.contentsRepository.getContentByID(contentId);
  }

  async updateContent(data: UpdateContentInput): Promise<ContentModel> {
    console.log('SERVICE', data);

    return await this.contentsRepository.updateContent(data);
  }

  async deleteContents(contentIds: number[]): Promise<boolean> {
    await this.contentsRepository.deleteContents(contentIds);
    return true;
  }
}
