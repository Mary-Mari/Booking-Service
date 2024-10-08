import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactService } from '../services/contacts/contacts.service';
import { ContactController } from '../controllers/contacts/contacts.controller';
import { Contact, ContactSchema } from '../schemas/contacts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
