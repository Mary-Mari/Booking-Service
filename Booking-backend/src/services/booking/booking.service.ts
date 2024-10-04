import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from '../../dto/create-booking.dto';
import { Booking } from 'src/schemas/booking.schema';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async create(createBookingDto: CreateBookingDto): Promise<CreateBookingDto> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async checkAvailability(createBookingDto: CreateBookingDto): Promise<boolean> {
    const { checkIn, checkOut } = createBookingDto;

    const bookings = await this.bookingModel.find({
      $or: [
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkIn } },
        { checkIn: { $gte: checkIn, $lte: checkOut } },
      ],
    });

    return bookings.length === 0;
  }


  async getUnavailableDates(): Promise<Date[]> {
    const bookings = await this.bookingModel.find({}, 'checkIn checkOut').exec();
    const unavailableDates: Date[] = [];

    bookings.forEach(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      const currentDate = new Date(checkIn);

      while (currentDate < checkOut) {
        unavailableDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return unavailableDates;
  }
}


