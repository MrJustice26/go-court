import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { QueryDto } from './dto/search-query.dto';

@Injectable()
export class NominatimService {
  constructor(private readonly httpService: HttpService) {}

  readonly baseUrl: string = 'https://nominatim.openstreetmap.org';
  readonly restQuery = {
    'accept-language': 'pl',
    countrycodes: 'pl',
    limit: 5,
    format: 'json',
  };
  readonly restQueryParams: string = Object.keys(this.restQuery)
    .map((k) => `${k}=${this.restQuery[k]}`)
    .join('&');

  getReadableAddress = async (location: { lat: number; lng: number }) => {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/reverse?lat=${location.lat}&lon=${location.lng}&${this.restQueryParams}`,
      ),
    );

    const fallbackDisplayTemplate = data?.display_name;
    if (!data?.display_name) {
      return data?.display_name;
    }

    if (
      (!data?.address?.city && !data?.address?.village) ||
      !data?.address?.road
    ) {
      return fallbackDisplayTemplate;
    }

    return `${data?.address?.road}${
      data?.address?.house_number ? ` ${data?.address?.house_number}` : ''
    }, ${data?.address?.city || data?.address?.village}`;
  };

  searchByQuery = async (query: QueryDto) => {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/search?q="${query.q}"&addressdetails=1&${this.restQueryParams}`,
      ),
    );

    return data.map((place) => ({
      lat: place?.lat,
      lon: place?.lon,
      display_name: place?.display_name,
    }));
  };
}
