import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { LoginRedirect } from "../../../auth/actions/auth.actions";
import { InvalidOtpTokenError } from "../../../otp-auth.module/errors/otp-token-invalid.error";
import * as fromRoot from "../../../reducers";
import { BadRequestMapper } from "../../services/bad-request.mapper/bad-request.mapper";
import { ErrorToStringProvider } from "./error-to-string.provider";

@Injectable()
export class BadRequestInterceptor implements HttpInterceptor {
  constructor(private badRequestMapper: BadRequestMapper,
              private errorToStringProvider: ErrorToStringProvider,
              private store: Store<fromRoot.IState>) {

  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            const response = error as HttpErrorResponse;
            if (response.status === 400) {
              return this.errorToStringProvider.get(response.error)
                .pipe(switchMap(content => {
                  const mappedError = this.badRequestMapper.get(content.replace(new RegExp("\"", "g"), "")); // TODO
                  if (mappedError instanceof InvalidOtpTokenError) {
                    this.onInvalidOtpTokenError();
                  }
                  return throwError(mappedError !== undefined ? mappedError : error);
                }));
            }
          }
          return throwError(error);
        })
      );
  }

  private onInvalidOtpTokenError() {
    this.store.dispatch(new LoginRedirect());
  }
}
