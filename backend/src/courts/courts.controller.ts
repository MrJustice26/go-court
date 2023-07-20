import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';

import { Court } from './schemas/court.schema';
import { CourtsService } from './courts.service';
import { GetCourtByNameDto } from './dto/get-court-by-name.dto';

@Controller('courts')
export class CourtsControlller {
  constructor(private readonly courtsService: CourtsService) { }

  @Get(':courtId')
  async getUser(@Param('courtId') id: string): Promise<Court> {
    return this.courtsService.getCourtById(id);
  }

  @Get()
  async getCourts(@Query() getCourtBy: GetCourtByNameDto): Promise<Court[]> {
    return this.courtsService.getCourts(getCourtBy);
  }

  @Post('create')
  async createCourt(@Body() createCourtDto: CreateCourtDto): Promise<Court> {
    return this.courtsService.createCourt(createCourtDto);
  }

  @Patch(':courtId')
  async updateCourt(
    @Param('courtId') courtId: string,
    @Body() updateCourtDto: UpdateCourtDto,
  ): Promise<Court> {
    return this.courtsService.updateCourt(courtId, updateCourtDto);
  }
}
