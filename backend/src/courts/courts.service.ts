import { Injectable } from '@nestjs/common';
import { CourtsRepository } from './courts.repository';
import { Court } from './schemas/court.schema';
import { UpdateCourtDto } from './dto/update-court.dto';
import { NominatimService } from 'src/nominatim/nominatim.service';
import { CreateCourtDto } from './dto/create-court.dto';

@Injectable()
export class CourtsService {
  constructor(
    private readonly courtsRepository: CourtsRepository,
    private readonly nominatimService: NominatimService,
  ) {}

  async getCourtById(courtId: string): Promise<Court> {
    return this.courtsRepository.findOne({ _id: courtId });
  }

  async getCourts(name?: string): Promise<Court[]> {
    if (!name) {
      return this.courtsRepository.find({});
    }
    const nameWithoutDoubleQuotes = name.replace(/['"]+/g, '');
    return this.courtsRepository.find({
      name: { $regex: nameWithoutDoubleQuotes, $options: 'i' },
    });
  }

  async createCourt({
    name,
    description,
    location,
  }: CreateCourtDto): Promise<Court> {
    const readableAddress = await this.nominatimService.getReadableAddress(
      location,
    );

    return this.courtsRepository.create({
      name,
      description,
      court_type: 1,
      location,
      readable_address: readableAddress,
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
