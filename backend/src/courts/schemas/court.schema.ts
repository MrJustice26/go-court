import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourtDocument = Court & Document;

@Schema()
export class Court {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  court_type: number;

  @Prop(
    raw({
      lat: { type: Number },
      lng: { type: Number },
    }),
  )
  location: { lat: number; lng: number };

  @Prop({ type: String, required: true })
  readable_address: string;
}

export const CourtSchema = SchemaFactory.createForClass(Court);
