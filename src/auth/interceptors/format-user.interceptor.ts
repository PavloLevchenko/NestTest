import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { authConstants } from "../constants";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class FormatUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException(authConstants.userEmptyObjectError);
        }
        const userDto = new UserDto();
        userDto.email = user.email;
        userDto.subscription = user.subscription;
        return userDto;
      }),
    );
  }
}
