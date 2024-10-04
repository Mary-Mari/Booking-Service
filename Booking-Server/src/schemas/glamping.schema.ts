import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Glamping extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({ type: [String], required: true })
  amenities: string[];
  
  @Prop() 
  image?: string;
}

export const GlampingSchema = SchemaFactory.createForClass(Glamping);
