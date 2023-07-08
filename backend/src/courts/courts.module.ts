import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Court, CourtSchema } from './schemas/court.schema';
import { CourtsControlller } from './courts.controller';
import { CourtsRepository } from './courts.repository';
import { CourtsService } from './courts.service';
import { NominatimModule } from 'src/nominatim/nominatim.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Court.name, schema: CourtSchema }]),
    NominatimModule,
  ],
  controllers: [CourtsControlller],
  providers: [CourtsService, CourtsRepository],
})
export class CourtsModule {}
