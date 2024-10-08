import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Glamping, GlampingSchema } from '../schemas/glamping.schema';
import { CreateGlampingDto } from '../dto/create-glamping.dto';

@Injectable()
export class GlampingService {
  constructor(@InjectModel(Glamping.name) private glampingModel: Model<Glamping>) {}

  async create(createGlampingDto: CreateGlampingDto): Promise<Glamping> {
    const createdGlamping = new this.glampingModel(createGlampingDto);
    return createdGlamping.save();
  }

  async findAll(): Promise<Glamping[]> {
    return this.glampingModel.find().exec();
  }

  async findById(id: string): Promise<Glamping> {
    return this.glampingModel.findById(id).exec();
  }

  async update(id: string, updateGlampingDto: CreateGlampingDto): Promise<Glamping> {
    return this.glampingModel.findByIdAndUpdate(id, updateGlampingDto, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.glampingModel.findByIdAndDelete(id).exec();
  }
}
