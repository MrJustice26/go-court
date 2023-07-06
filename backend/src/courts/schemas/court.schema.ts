import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourtDocument = Court & Document;

@Schema()
export class Court {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  court_type: number;

  @Prop()
  location: [number, number];
}

export const CourtSchema = SchemaFactory.createForClass(Court);
