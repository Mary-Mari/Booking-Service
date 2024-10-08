import { IsString, IsNumber } from 'class-validator';

export class CreateHouseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  capacity: number;

  @IsNumber()
  price: number;

  @IsString()
  amenities: string[]; 

  @IsString()
  image: string; 
}
