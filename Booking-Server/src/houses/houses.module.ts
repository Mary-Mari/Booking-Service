import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HousesService } from '../services/houses.service';
import { HousesController } from '../controllers/house/houses.controller';
import { House, HouseSchema } from '../schemas/house.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
  MulterModule.register({
    dest: './uploads', // Путь для сохранения загружаемых файлов
  }),],
  
  controllers: [HousesController],
  providers: [HousesService],
})
export class HousesModule {}
