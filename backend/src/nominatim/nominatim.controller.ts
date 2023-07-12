import { Controller, Get, Query } from '@nestjs/common';
import { NominatimService } from './nominatim.service';
import { SearchQueryDto } from './dto/search-query.dto';
import { ReadableQueryDto } from './dto/readable-query.dto';

@Controller('nominatim')
export class NominatimController {
  constructor(private readonly nominatimService: NominatimService) {}

  @Get('readable-address')
  async getReadableAddress(@Query() query: ReadableQueryDto) {
    if (!query?.lat || !query?.lng) return null;

    const location = {
      lat: query.lat,
      lng: query.lng,
    };
    const address = await this.nominatimService.getReadableAddress(location);
    return { address: address || 'No address' };
  }

  @Get('search')
  async searchByQuery(@Query() query: SearchQueryDto) {
    const data = await this.nominatimService.searchByQuery(query);
    return data;
  }
}
