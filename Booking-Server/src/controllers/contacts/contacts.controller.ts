import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from '../../services/contacts/contacts.service';
import { CreateContactDto } from '../../dto/create-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(@Body() createContactDto: CreateContactDto): Promise<{ message: string }> {
    await this.contactService.create(createContactDto);
    return { message: 'Спасибо за обратную связь!' };
  }
}