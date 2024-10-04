
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House } from '../schemas/house.schema';
import { CreateHouseDto } from '../dto/create-house.dto';

@Injectable()
export class HousesService {
  constructor(@InjectModel(House.name) private houseModel: Model<House>) {}

  async create(createHouseDto: CreateHouseDto): Promise<House> {
    const createdHouse = new this.houseModel(createHouseDto);
    return createdHouse.save();
  }

  async findAll(): Promise<House[]> {
    return this.houseModel.find().exec();
  }

  async findById(id: string): Promise<House> {
    return this.houseModel.findById(id).exec();
  }

  async update(id: string, updateHouseDto: CreateHouseDto): Promise<House> {
    return this.houseModel.findByIdAndUpdate(id, updateHouseDto, { new: true }).exec();
  }

  async delete(id: string): Promise<House> {
    return this.houseModel.findByIdAndDelete(id).exec();
  }

}

