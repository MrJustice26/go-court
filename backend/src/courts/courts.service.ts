import { Injectable } from '@nestjs/common';
import { CourtsRepository } from './courts.repository';
import { Court } from './schemas/court.schema';
import { UpdateCourtDto } from './dto/update-court.dto';

@Injectable()
export class CourtsService {
  constructor(private readonly courtsRepository: CourtsRepository) {}

  async getCourtById(courtId: string): Promise<Court> {
    return this.courtsRepository.findOne({ id: courtId });
  }

  async getCourts(): Promise<Court[]> {
    return this.courtsRepository.find({});
  }

  async createCourt(
    name: string,
    description: string,
    location: [number, number],
  ): Promise<Court> {
    return this.courtsRepository.create({
      name,
      description,
      court_type: 1,
      location,
    });
  }

  async updateCourt(
    courtId: string,
    courtUpdates: UpdateCourtDto,
  ): Promise<Court> {
    return this.courtsRepository.findOneAndUpdate(
      { id: courtId },
      courtUpdates,
    );
  }
}
