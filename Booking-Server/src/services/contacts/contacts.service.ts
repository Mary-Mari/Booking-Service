import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from '../../schemas/contacts.schema';
import { CreateContactDto } from '../../dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) {}

  async create(createContactDto: CreateContactDto): Promise<CreateContactDto> {
    const createdContact = new this.contactModel(createContactDto);
    return createdContact.save();
  }
}