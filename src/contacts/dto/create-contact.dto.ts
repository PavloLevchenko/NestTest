import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsEmail } from "class-validator";

export class CreateContactDto {
  @ApiProperty({ example: "John" })
  @IsString()
  name: string;
  @ApiProperty({ example: "user@gmail.com" })
  @IsEmail()
  email: string;
  @ApiProperty({ example: "8182487778" })
  @IsString()
  phone: string;
  @ApiProperty({ example: false, required: false })
  @IsBoolean()
  favorite: boolean;
}
