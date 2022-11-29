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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Auth } from "src/common/auth.decorator";
import { Contact } from "./entities/contact.entity";

@Auth()
@ApiTags("contacts")
@Controller("api/contacts")
@ApiResponse({ status: 404, description: 'Contact not found' })
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  /**
   * Create contact
   */
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
