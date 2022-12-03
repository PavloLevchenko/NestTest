import { OmitType } from "@nestjs/swagger";
import { Contact } from "../entities/contact.entity";

export class CreateContactDto extends OmitType(Contact, ["_id"] as const) {}
