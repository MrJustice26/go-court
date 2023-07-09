import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NominatimService {
  constructor(private readonly httpService: HttpService) {}

  readonly baseUrl: string = 'https://nominatim.openstreetmap.org';
  readonly restQueryParams: string = 'format=json&accept-language=pl';

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
}
