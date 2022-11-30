import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard, JwtAuthGuard } from "../auth/guards";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { User } from "src/common/user.decorator";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/common/auth.decorator";
import { LoginDto } from "src/auth/dto/login.dto";
import { UsersService } from "./users.service";
import { UpdateUserSubscribtion } from "./dto/update-user-subscribtion.dto";
import { FormatUserInterceptor } from "src/common/format-user.interceptor";

@ApiTags('users')
@Controller("api/users")
export class UsersController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post("signup")
  @UseInterceptors(FormatUserInterceptor)
  async signup(@Body() body:CreateUserDto) {
    return this.usersService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post("login")
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @Auth()
  @Get("logout")
  logout() {
    return this.authService.logout();
  }

  @Auth()
  @Get("current")
  @UseInterceptors(FormatUserInterceptor)
  async getProfile(@User() user: UserEntity) {
    return user;
  }

  @Auth()
  @Patch()
  updateSubscribtion(@User() user: UserEntity, @Body() updateUserSubscribtion: UpdateUserSubscribtion,) {
    return this.usersService.updateSubscribtion(user, updateUserSubscribtion);
  }

  @Auth()
  @Patch("avatars")
  updateAvatar(@User() user: UserEntity) {
    return this.usersService.updateAvatar(user._id);
  }

  @Auth()
  @Get("verify/:verificationToken")
  verifyToken(@Param("verificationToken") token: string,) {
    return this.authService.verifyToken(token);
  }

  @Auth()
  @Post("verify")
  sendVerification(@User() user: UserEntity) {
    return this.authService.sendVerification(user._id);
  }
}
