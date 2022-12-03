import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from "@nestjs/common";
import { Observable, tap, map, mergeMap, withLatestFrom, from } from "rxjs";
import { getVerificationUrl } from "src/common/helpers";
import { sendVerificationMail } from "src/common/sendGrid";
import { authConstants } from "../constants";

@Injectable()
export class EmailVerificationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const user$ = next.handle();
    const url$ = user$.pipe(
      tap(({ user }) => {
        if (user && !user.verificationToken) {
          throw new NotFoundException();
        }
      }),
      mergeMap(({ user }) => {
        return from(getVerificationUrl(user.verificationToken)).pipe(
          mergeMap((url) => {
            return from(sendVerificationMail(user.email, url)).pipe(
              map((response) => {
                if (response[0].statusCode == 202) {
                  if (user.subscription) {
                    return user;
                  }
                  return {
                    message: authConstants.sendVerificationEmailMessage,
                  };
                }
              }),
            );
          }),
        );
      }),
    );

    return url$;
  }
}
