import { IsString } from 'class-validator';
import { removeQuotes } from 'src/common/helper/cast.helper';
import { Transform } from 'class-transformer';

export class SearchQueryDto {
  @Transform(({ value }) => removeQuotes(value))
  @IsString()
  q: string;
}
