import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class House extends Document {
  

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  capacity: number;

  @Prop()
  amenities: string[];

  @Prop() 
  image?: string;
} 


export const HouseSchema = SchemaFactory.createForClass(House);

