import { IsString } from 'class-validator';

export class ReadableQueryDto {
  @IsString()
  lat: number;

  @IsString()
  lng: number;
}
