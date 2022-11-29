import { PickType } from "@nestjs/swagger";
import { CreateContactDto } from "./create-contact.dto";

export class UpdateContactFavoryteDto extends PickType(CreateContactDto, ['favorite'] as const) {}
