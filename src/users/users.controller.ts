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
  HttpCode,
} from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { LocalAuthGuard } from "../auth/guards";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { User } from "src/auth/decorators/user.decorator";
import {
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";
import { LoginDto } from "src/auth/dto/login.dto";
import { UsersService } from "./users.service";
import { UpdateUserSubscribtion } from "./dto/update-user-subscribtion.dto";
import { FormatUserInterceptor } from "src/auth/interceptors/format-user.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "src/common/pipes/file-size-validation.pipe";
import { SharpPipe } from "src/users/pipes/sharp.pipe";
import { VerifyUserEmailDto } from "./dto/verify-user-email.dto";
import { appConstants } from "src/constants";
import { EmptyResponseInterceptor } from "src/common/interceptors/empty-response.interceptor";
import { UserDto } from "src/auth/dto/user.dto";
import { userConstants } from "./constants";
import { UpdatedUserAvatar } from "./dto/updated-user-avatar.dto";
import { ConfirmEmailResponseDto } from "src/auth/dto/confirm-email-response.dto copy";
import { TokenForEmailResponseDto } from "src/auth/dto/token-for-email-response.dto";

@ApiTags("users")
@UseInterceptors(EmptyResponseInterceptor)
@Controller("api/users")
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  /**
   * Creating new user, sending confirmation email
   */
  @HttpCode(200)
  @ApiOkResponse({
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @UseInterceptors(FormatUserInterceptor)
  @Post("signup")
  async signup(@Body() body: CreateUserDto) {
    return await this.usersService.signup(body);
  }

  /**
   * Creating new user, sending email verification token
   */
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @ApiBody({ type: LoginDto })
  @Post("login")
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }

  /**
   * Log out
   */
  @Auth()
  @HttpCode(204)
  @ApiNoContentResponse({ description: userConstants.successLogoutResponse })
  @Get("logout")
  async logout(@User() user: UserEntity) {
    return await this.authService.logout(user);
  }

  /**
   * Get current user
   */
  @Auth()
  @UseInterceptors(FormatUserInterceptor)
  @Get("current")
  async getProfile(@User() user: UserEntity) {
    return user;
  }

  /**
   * Get user avatar
   */
  @Auth()
  @ApiOkResponse({
    type: UpdatedUserAvatar,
  })
  @Get("current/avatar")
  async getAvatar(@User() user: UserEntity) {
    return { avatarUrl: user.avatarURL };
  }

  /**
   * Updating user subscribtion
   */
  @ApiOkResponse({
    type: UpdateUserSubscribtion,
  })
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @Auth()
  @Patch()
  async updateSubscribtion(
    @User() user: UserEntity,
    @Body() updateUserSubscribtion: UpdateUserSubscribtion,
  ) {
    return await this.usersService.update(user, updateUserSubscribtion);
  }

  /**
   * Updating user avatar
   */
  @ApiOkResponse({
    type: UpdatedUserAvatar,
  })
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @Auth()
  @UseInterceptors(FileInterceptor("avatar"))
  @Patch("avatars")
  async updateAvatar(
    @User() user: UserEntity,
    @UploadedFile(FileSizeValidationPipe(), SharpPipe)
    avatarURL: string,
  ) {
    await this.usersService.update(user, { avatarURL });
    return { avatarURL };
  }

  /**
   * Email verification
   */
   @ApiOkResponse({
    type: ConfirmEmailResponseDto,
  })
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @Get("verify/:verificationToken")
  async verifyToken(@Param("verificationToken") token: string) {
    return await this.authService.verifyToken(token);
  }

  /**
   * Sending email verification token
   */
  @HttpCode(200)
  @ApiOkResponse({
    type: TokenForEmailResponseDto,
  })
  @ApiResponse({ status: 400, description: appConstants.missingFieldsError })
  @Post("verify")
  async sendVerification(@Body() verifyUserEmailDto: VerifyUserEmailDto) {
    return await this.authService.sendVerification(verifyUserEmailDto);
  }
}
