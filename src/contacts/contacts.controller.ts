import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ContactsService } from "./contacts.service";
import {
  CreateContactDto,
  UpdateContactDto,
  UpdateContactFavoryteDto,
} from "./dto";
import { EmptyBodyValidationPipe } from "../common/pipes/empty-body-validation.pipe";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { GetContactsDto } from "./dto/get-contact.dto";
import { Types } from "mongoose";
import { EmptyResponseInterceptor } from "src/common/interceptors/empty-response.interceptor";
import { contactsConstants } from "./constants";
import { Contact } from "./entities/contact.entity";
import { appConstants } from "src/constants";

@Auth()
@ApiTags("contacts")
@Controller("api/contacts")
@ApiResponse({ status: 400, description: appConstants.missingFieldsError })
@ApiResponse({ status: 404, description: contactsConstants.notFoundError })
@UseInterceptors(EmptyResponseInterceptor)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  /**
   * Create contact
   */
  @ApiCreatedResponse({
    type: Contact,
  })
  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.create(createContactDto);
  }

  /**
   * Get all contacts
   */
  @ApiOkResponse({
    type: Contact,
    isArray: true,
  })
  @Get()
  async findAll(@Query() query: GetContactsDto) {
    return await this.contactsService.findAll(query);
  }

  /**
   * Get contact by id
   */
  @ApiOkResponse({
    type: Contact,
  })
  @Get(":id")
  findOne(@Param("id") id: Types.ObjectId) {
    return this.contactsService.findOne(id);
  }

  /**
   * Make/unmake contact favorite
   */
  @ApiOkResponse({
    type: UpdateContactFavoryteDto,
  })
  @Patch(":id/favorite")
  async updateFavorite(
    @Param("id") id: Types.ObjectId,
    @Body() updateContactFavoryteDto: UpdateContactFavoryteDto,
  ) {
    return await this.contactsService.update(id, updateContactFavoryteDto);
  }

  /**
   * Update contact
   */
  @ApiOkResponse({
    type: Contact,
  })
  @Put(":id")
  async update(
    @Param("id") id: Types.ObjectId,
    @Body(new EmptyBodyValidationPipe()) updateContactDto: UpdateContactDto,
  ) {
    return await this.contactsService.update(id, updateContactDto);
  }

  /**
   * Delete contact
   */
  @ApiOkResponse({
    type: Contact,
  })
  @Delete(":id")
  async remove(@Param("id") id: Types.ObjectId) {
    return await this.contactsService.remove(id);
  }
}
