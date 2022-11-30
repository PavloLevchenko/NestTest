import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class FormatUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((user) => {
        if (!user) {
          throw new UnauthorizedException("Bad User object");
        }
        return { email: user.email, subscription: user.subscription };
      }),
    );
  }
}
