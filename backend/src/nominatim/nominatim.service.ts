import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SearchQueryDto } from './dto/search-query.dto';
import { ReadableQueryDto } from './dto/readable-query.dto';
import { Place } from './nominatim.interface';
import { formatAddress } from './nominatim.utils';

@Injectable()
export class NominatimService {
  constructor(private readonly httpService: HttpService) {}

  readonly baseUrl: string = 'https://nominatim.openstreetmap.org';
  readonly restQuery = {
    'accept-language': 'pl',
    limit: 5,
    format: 'json',
  };
  readonly restQueryParams: string = Object.keys(this.restQuery)
    .map((restQueryKey) => `${restQueryKey}=${this.restQuery[restQueryKey]}`)
    .join('&');

  getReadableAddress = async ({ lat, lng }: ReadableQueryDto) => {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/reverse?lat=${lat}&lon=${lng}&${this.restQueryParams}`,
      ),
    );

    return formatAddress(data);
  };

  searchByQuery = async (query: SearchQueryDto) => {
    const { data } = await firstValueFrom(
      this.httpService.get<Place[]>(
        `${this.baseUrl}/search?q="${query.q}"&addressdetails=1&${this.restQueryParams}`,
      ),
    );

    return data.map((place) => ({
      address: {
        lat: parseFloat(place?.lat),
        lng: parseFloat(place?.lon),
      },
      display_name: formatAddress(place),
    }));
  };
}
