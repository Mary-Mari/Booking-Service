import { Controller, Post,Get, Body, BadRequestException } from '@nestjs/common';
import { BookingService } from '../../services/booking/booking.service';
import { CreateBookingDto } from '../../dto/create-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/unavailable-dates')
  async getUnavailableDates(): Promise<Date[]> {
    return this.bookingService.getUnavailableDates();
  }


 @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<{ message: string }> {
    const isAvailable = await this.bookingService.checkAvailability(createBookingDto);

    if (!isAvailable) {
      throw new BadRequestException('Выбранные даты недоступны для бронирования.');
    }

    await this.bookingService.create(createBookingDto);
    return { message: 'Заявка принята, с вами свяжется администратор.' };
  }
}
