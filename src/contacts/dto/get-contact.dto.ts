import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsBoolean, IsOptional } from "class-validator";
import { contactsConstants } from "../constants";

export class GetContactsDto {
  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  page: number;
  @ApiProperty({
    default: contactsConstants.contactsPageLimit,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  limit: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  favorite: boolean;
}
