import { IsOptional, IsString } from 'class-validator';

export class GetCourtByNameDto {
  @IsOptional()
  @IsString()
  name: string;
}
