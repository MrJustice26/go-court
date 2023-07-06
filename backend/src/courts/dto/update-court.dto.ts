import { IsNotEmpty } from 'class-validator';

export class UpdateCourtDto {
  @IsNotEmpty()
  description: string;
}
