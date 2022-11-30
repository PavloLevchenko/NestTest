import { IsString } from "class-validator";

export class UserEntity {
  @IsString()
  _id: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
