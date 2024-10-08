import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingService } from '../services/booking/booking.service';
import { BookingController } from '../controllers/booking/booking.controller';
import { Booking, BookingSchema } from '../schemas/booking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
