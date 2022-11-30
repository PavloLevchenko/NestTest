import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && user.password === pass) {
      //todo add password bcrypt
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: { email: user.email, subscription: user.subscription },
    };
  }

  async validateToken(payload: any): Promise<any> {
    const user = await this.usersService.findUserById(payload.sub);
    //todo add verifikation || payload.iat !== tockenCreationTimestamp
    if (!user) {
      return null;
    }
    return user;
  }

  async logout() {
    return `This action log out user`;
  }

  async verifyToken(id: string) {
    return `This action verify #${id} user`;
  }

  async sendVerification(id: string) {
    return `This action send verification token for #${id} user`;
  }
}
