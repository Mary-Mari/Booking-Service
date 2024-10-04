import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateGlampingDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  price: number;

  @IsArray()
  amenities: string[];

  @IsString()
  image: string; 
}
