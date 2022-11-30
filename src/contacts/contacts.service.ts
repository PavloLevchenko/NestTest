import { Injectable } from "@nestjs/common";
import {
  CreateContactDto,
  UpdateContactDto,
  UpdateContactFavoryteDto,
} from "./dto";
import { GetContactsDto } from "./dto/get-contact.dto";

@Injectable()
export class ContactsService {
  create(createContactDto: CreateContactDto) {
    return "This action adds a new contact";
  }

  findAll(query: GetContactsDto) {
    return `This action returns all contacts`;
  }

  findOne(id: string) {
    return `This action returns a #${id} contact`;
  }
  updateFavorite(
    id: string,
    updateContactFavoryteDto: UpdateContactFavoryteDto,
  ) {
    return `This action updates a #${id} contact favorite`;
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: string) {
    return `This action removes a #${id} contact`;
  }
}
