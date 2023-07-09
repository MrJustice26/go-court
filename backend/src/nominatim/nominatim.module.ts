import { Module } from '@nestjs/common';

import { NominatimService } from './nominatim.service';
import { HttpModule } from '@nestjs/axios';
import { NominatimController } from './nominatim.controller';

@Module({
  imports: [HttpModule],
  providers: [NominatimService],
  exports: [NominatimService],
  controllers: [NominatimController],
})
export class NominatimModule {}
