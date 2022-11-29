import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard, JwtAuthGuard } from "../auth/guards";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { User } from "src/common/user.decorator";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/common/auth.decorator";
import { LoginDto } from "src/auth/dto/login.dto";
import { CreateContactDto } from "src/contacts/dto";

@ApiTags('users')
@Controller("api/users")
export class UsersController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post("login")
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Auth()
  @Get("current")
  getProfile(@User() user: UserEntity) {
    return user;
  }
}
