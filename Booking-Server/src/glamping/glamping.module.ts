import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlampingService } from '../services/glamping.service';
import { GlampingController } from '../controllers/glamping/glamping.controller';
import { Glamping, GlampingSchema } from '../schemas/glamping.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Glamping.name, schema: GlampingSchema }])],
  providers: [GlampingService],
  controllers: [GlampingController],
})
export class GlampingModule {}
