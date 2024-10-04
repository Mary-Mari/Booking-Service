import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { HousesService } from '../../services/houses.service';
import { House } from '../../schemas/house.schema';
import { CreateHouseDto } from '../../dto/create-house.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}


  static imageName: string;

  @Get()
  async getAllHouses(): Promise<House[]> {
    return this.housesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<House> {
    return this.housesService.findById(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log(file);

          const imageType = file.mimetype;
          console.log(imageType);
          
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          console.log(uniqueSuffix);
          const imageName = uniqueSuffix;
          console.log(imageName);
          cb(null, imageName);
          HousesController.imageName = imageName;
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: CreateHouseDto): Promise<any> {
    if (file) {
      body.image = HousesController.imageName;
      // Сохранение информации о доме в базу данных
      const createdHouse = await this.housesService.create(body);
      // Вернуть созданный объект дома в качестве ответа
      return createdHouse; 
    } else {
      throw new Error('No file uploaded');
    }
  }

  
  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateHouseDto: CreateHouseDto): Promise<House> {
    return this.housesService.update(id, updateHouseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<House> {
    return this.housesService.delete(id);
  }
}
