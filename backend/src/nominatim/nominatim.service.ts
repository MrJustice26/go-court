import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NominatimService {
  constructor(private readonly httpService: HttpService) {}

  readonly baseUrl: string = 'https://nominatim.openstreetmap.org';
  readonly restQueryParams: string = 'format=json&accept-language=pl';

  getReadableAddress = async (location: { lat: number; lon: number }) => {
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${this.baseUrl}/reverse?lat=${location.lat}&lon=${location.lon}&${this.restQueryParams}`,
      ),
    );

    if (!data?.address?.city || !data?.address?.road) {
      return null;
    }

    return `${data.address.road}${
      data.address.house_number ? ` ${data.address.house_number}` : ''
    }, ${data.address?.country}`;
  };
}
