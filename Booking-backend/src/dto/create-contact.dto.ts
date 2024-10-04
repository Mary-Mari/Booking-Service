import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateContactDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}