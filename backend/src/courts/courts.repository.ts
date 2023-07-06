import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Court, CourtDocument } from './schemas/court.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class CourtsRepository {
  constructor(
    @InjectModel(Court.name) private courtModel: Model<CourtDocument>,
  ) {}

  async findOne(courtFilterQuery: FilterQuery<Court>): Promise<Court> {
    return this.courtModel.findOne(courtFilterQuery);
  }

  async find(courtFilterQuery: FilterQuery<Court>): Promise<Court[]> {
    return this.courtModel.find(courtFilterQuery);
  }

  async create(court: Court): Promise<Court> {
    const newCourt = new this.courtModel(court);
    return newCourt.save();
  }

  async findOneAndUpdate(
    courtFilterQuery: FilterQuery<Court>,
    court: Partial<Court>,
  ): Promise<Court> {
    return this.courtModel.findOneAndUpdate(courtFilterQuery, court);
  }
}
