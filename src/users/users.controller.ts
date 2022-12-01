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
  UploadedFile,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { User } from "src/common/user.decorator";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/common/auth.decorator";
import { LoginDto } from "src/auth/dto/login.dto";
import { UsersService } from "./users.service";
import { UpdateUserSubscribtion } from "./dto/update-user-subscribtion.dto";
import { FormatUserInterceptor } from "src/common/format-user.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "src/common/file-size-validation.pipe";
import { SharpPipe } from "src/common/sharp.pipe";
import { VerifyUserEmailDto } from "./dto/verify-user-email.dto";

@ApiTags("users")
@Controller("api/users")
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post("signup")
  @UseInterceptors(FormatUserInterceptor)
  async signup(@Body() body: CreateUserDto) {
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
  logout(@User() user: UserEntity) {
    return this.authService.logout(user);
  }

  @Auth()
  @Get("current")
  @UseInterceptors(FormatUserInterceptor)
  async getProfile(@User() user: UserEntity) {
    return user;
  }

  @Auth()
  @Get("current/avatar")
  async getAvatar(@User() user: UserEntity) {
    return user.avatarURL;
  }

  @Auth()
  @Patch()
  updateSubscribtion(
    @User() user: UserEntity,
    @Body() updateUserSubscribtion: UpdateUserSubscribtion,
  ) {
    return this.usersService.update(user, updateUserSubscribtion);
  }

  @Auth()
  @Patch("avatars")
  @UseInterceptors(FileInterceptor("avatar"))
  updateAvatar(
    @User() user: UserEntity,
    @UploadedFile(FileSizeValidationPipe(), SharpPipe)
    avatarURL: string,
  ) {
    return this.usersService.update(user, { avatarURL });
  }

  @Auth()
  @Get("verify/:verificationToken")
  verifyToken(@Param("verificationToken") token: string) {
    return this.authService.verifyToken(token);
  }

  @Post("verify")
  sendVerification(@Body() verifyUserEmailDto: VerifyUserEmailDto) {
    return this.authService.sendVerification(verifyUserEmailDto);
  }
}
