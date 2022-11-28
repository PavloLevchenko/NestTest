import { IsString, IsBoolean, MinLength, IsEmail } from "class-validator";

export class CreateContactDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  phone: string;
  @IsBoolean()
  favorite: boolean;
}
