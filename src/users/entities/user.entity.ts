import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class UserEntity {
  @IsString()
  _id: string;
  @ApiProperty({ example: "user@gmail.com"})
  @IsEmail()
  email: string;
  @ApiProperty({ example: "Pas123"})
  @IsString()
  @MinLength(6)
  password: string;
  @IsString()
  subscription:string;
}
