import { Controller, Get, Query } from '@nestjs/common';
import { NominatimService } from './nominatim.service';
@Controller('nominatim')
export class NominatimController {
  constructor(private readonly nominatimService: NominatimService) {}

  @Get('readable-address')
  async getReadableAddress(@Query() query) {
    if (!query?.lat || !query.lon) return null;

    const location = {
      lat: query.lat,
      lon: query.lon,
    };
    const address = await this.nominatimService.getReadableAddress(location);
    return { address: address || 'No address' };
  }
}
