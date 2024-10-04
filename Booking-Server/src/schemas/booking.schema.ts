
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  checkIn: string;

  @Prop({ required: true })
  checkOut: string;

  @Prop({ required: true })
  guests: number;

  @Prop({ required: true })
  phone: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
