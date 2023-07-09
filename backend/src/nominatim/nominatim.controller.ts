import { Controller, Get, Query } from '@nestjs/common';
import { NominatimService } from './nominatim.service';
@Controller('nominatim')
export class NominatimController {
  constructor(private readonly nominatimService: NominatimService) {}

  @Get('readable-address')
  async getReadableAddress(@Query() query) {
    if (!query?.lat || !query?.lng) return null;

    const location = {
      lat: query.lat,
      lng: query.lng,
    };
    const address = await this.nominatimService.getReadableAddress(location);
    return { address: address || 'No address' };
  }
}
