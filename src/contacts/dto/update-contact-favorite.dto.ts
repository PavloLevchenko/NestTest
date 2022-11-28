import { PickType } from "@nestjs/mapped-types";
import { CreateContactDto } from "./create-contact.dto";

export class UpdateContactFavoryteDto extends PickType(CreateContactDto, ['favorite'] as const) {}
