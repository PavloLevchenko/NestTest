import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { authConstants } from "../constants";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, authConstants.localStrategyName) {
  constructor(private authService: AuthService) {
    super(authConstants.localStrategyFields);
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
