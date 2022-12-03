import { UserDto } from "./user.dto";

export class LoginResponseDto {
  token: string;
  user: UserDto;
}
