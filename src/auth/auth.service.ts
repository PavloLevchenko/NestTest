import {
  BadRequestException,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { comparePassword } from "src/common/helpers";
import { VerifyUserEmailDto } from "src/users/dto/verify-user-email.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersService } from "../users/users.service";
import { authConstants } from "./constants";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await comparePassword(pass, user.password)) && user.verify) {
      const { password, ...result } = user;
      return result;
    }
    if (user && !user.verify) {
      throw new UnauthorizedException(authConstants.verificationEmailError);
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { sub: user._id };
    const token = this.jwtService.sign(payload);
    await this.usersService.update(user, { token });
    return {
      token,
      user: { email: user.email, subscription: user.subscription },
    };
  }

  async validateToken(payload: any): Promise<any> {
    const user = await this.usersService.findUserById(payload.sub);
    if (!user) {
      return null;
    }
    const dbTocken: any = this.jwtService.decode(user.token);
    const tockenCreationTimestamp = dbTocken ? dbTocken.iat : 0;
    if (payload.iat !== tockenCreationTimestamp) {
      return null;
    }
    return user;
  }

  async logout(user: UserEntity) {
    return await this.usersService.update(user, { token: null });
  }

  async verifyToken(token: string) {
    return await this.usersService.findUserByToken(token);
  }

  async sendVerification({ email }: VerifyUserEmailDto) {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.verify) {
      throw new BadRequestException(authConstants.verificationPassedError);
    }
    return user ? user.verificationToken : null;
  }
}
