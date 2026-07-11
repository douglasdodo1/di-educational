import { Injectable } from '@nestjs/common';
import { FrequencyRepository } from './frequency.repository';
import { FrequencyModel } from './frequency.model';

@Injectable()
export class FrequencyService {
  constructor(private frequencyRepository: FrequencyRepository) {}

  async findAllByAttendenceId(attendenceId: number): Promise<FrequencyModel[]> {
    return await this.frequencyRepository.findAllByAttendenceId(attendenceId);
  }

  async setFrequency(
    frequencyId: number,
    isPresent: boolean,
  ): Promise<FrequencyModel> {
    return await this.frequencyRepository.setFrequency(frequencyId, isPresent);
  }

  async setAllFrequencies(
    attendenceId: number,
    isPresent: boolean,
  ): Promise<FrequencyModel[]> {
    return await this.frequencyRepository.setAllFrequencies(
      attendenceId,
      isPresent,
    );
  }
}
