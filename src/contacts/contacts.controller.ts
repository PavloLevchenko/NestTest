import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import {
  CreateContactDto,
  UpdateContactDto,
  UpdateContactFavoryteDto,
} from "./dto";
import { EmptyBodyValidationPipe } from "../common/emptyBodyValidationPipe";
import { JwtAuthGuard } from "../auth/guards";

@UseGuards(JwtAuthGuard)
@Controller("api/contacts")
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    console.log(createContactDto);
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.contactsService.findOne(id);
  }

  @Patch(":id/favorite")
  updateFavorite(
    @Param("id") id: string,
    @Body() updateContactFavoryteDto: UpdateContactFavoryteDto,
  ) {
    return this.contactsService.updateFavorite(id, updateContactFavoryteDto);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body(new EmptyBodyValidationPipe()) updateContactDto: UpdateContactDto,
  ) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.contactsService.remove(id);
  }
}
