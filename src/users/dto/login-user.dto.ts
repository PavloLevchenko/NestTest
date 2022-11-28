import { IsString, IsBoolean, IsEmail,IsDefined } from "class-validator";

export class LoginUserDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
}