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

@Controller('courts')
export class CourtsControlller {
  constructor(private readonly courtsService: CourtsService) {}

  @Get(':courtId')
  async getUser(@Param('courtId') courtId: string): Promise<Court> {
    return this.courtsService.getCourtById(courtId);
  }

  @Get()
  async getCourts(@Query() query): Promise<Court[]> {
    return this.courtsService.getCourts(query?.name);
  }

  @Post('create')
  async createCourt(@Body() createCourtDto: CreateCourtDto): Promise<Court> {
    return this.courtsService.createCourt(
      createCourtDto.name,
      createCourtDto.description,
      createCourtDto.location,
    );
  }

  @Patch(':courtId')
  async updateCourt(
    @Param('courtId') courtId: string,
    @Body() updateCourtDto: UpdateCourtDto,
  ): Promise<Court> {
    return this.courtsService.updateCourt(courtId, updateCourtDto);
  }
}
