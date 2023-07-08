import { IsNotEmpty } from 'class-validator';
import { IsGeoLocation } from 'src/decorators/IsGeoLocation.decorator';

export class CreateCourtDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsGeoLocation()
  location: {
    lat: number;
    lon: number;
  };
}
