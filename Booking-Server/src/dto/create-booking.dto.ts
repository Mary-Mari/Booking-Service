
import { IsDateString, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  checkIn: string;

  @IsDateString()
  @IsNotEmpty()
  checkOut: string;

  @IsNumber()
  @IsNotEmpty()
  guests: number;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
