import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { GlampingService } from '../../services/glamping.service';
import { Glamping } from '../../schemas/glamping.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateGlampingDto } from 'src/dto/create-glamping.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Controller('glampings')
export class GlampingController {
  constructor(private readonly glampingsService: GlampingService) {}

  static imageName: string;

  @Get()
  async getAllGlampings(): Promise<Glamping[]> {
    return this.glampingsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Glamping> {
    return this.glampingsService.findById(id);
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
          GlampingController.imageName = imageName;
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateGlampingDto,
  ): Promise<any> {
    if (file) {
      body.image = GlampingController.imageName;
      // Сохранение информации о доме в базу данных
      const createdGlamping = await this.glampingsService.create(body);
      // Вернуть созданный объект дома в качестве ответа
      return createdGlamping;
    } else {
      throw new Error('No file uploaded');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createGlampingDto: CreateGlampingDto,
  ): Promise<Glamping> {
    return this.glampingsService.update(id, createGlampingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Glamping> {
    return this.glampingsService.delete(id);
  }
}
