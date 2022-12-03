import { Document, Model, Types } from "mongoose";
import { Inject, Injectable, Scope } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateContactDto, UpdateContactDto } from "./dto";
import { GetContactsDto } from "./dto/get-contact.dto";
import { Contact } from "./entities/contact.entity";
import { contactsConstants } from "./constants";
import { REQUEST } from "@nestjs/core";
const { defaultPage, contactsPageLimit } = contactsConstants;

@Injectable({ scope: Scope.REQUEST })
export class ContactsService {
  constructor(
    @Inject(REQUEST) protected readonly request: any,
    @InjectModel(Contact.name)
    private contacts: Model<Document<Contact>>,
  ) {}

  get user() {
    return this.request.user._id;
  }

  async create(body: CreateContactDto) {
    return await this.contacts.create({ ...body, owner: this.user });
  }

  async findAll({
    page = defaultPage,
    limit = contactsPageLimit,
    favorite,
  }: GetContactsDto) {
    const skip = (page - 1) * limit;
    if (page) {
      return await this.contacts
        .find({ owner: this.user })
        .skip(skip)
        .limit(limit);
    }
    if (favorite) {
      return await this.contacts.find({ owner: this.user, favorite });
    }
    if (page && favorite) {
      return await this.contacts
        .find({ owner: this.user, favorite })
        .skip(skip)
        .limit(limit);
    }
  }

  async findOne(_id: Types.ObjectId) {
    return await this.contacts.findOne({ _id, owner: this.user }).lean();
  }

  async update(_id: Types.ObjectId, body: UpdateContactDto) {
    return await this.contacts
      .findByIdAndUpdate({ _id, owner: this.user }, body, {
        new: true,
        runValidators: true,
      })
      .lean();
  }

  async remove(_id: Types.ObjectId) {
    return await this.contacts.findOneAndDelete({ _id, owner: this.user }).lean();
  }
}
