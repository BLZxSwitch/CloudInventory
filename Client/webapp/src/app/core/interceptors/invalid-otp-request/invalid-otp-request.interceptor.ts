import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import * as fromRoot from "../../../reducers";
import { OtpRequestErrorAction } from "../../actions/otp-request-error.action";
import { ErrorToStringProvider } from "../bad-request/error-to-string.provider";

@Injectable()
export class InvalidOtpActivationRequestInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.IState>,
              private errorToStringProvider: ErrorToStringProvider) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            const response = error as HttpErrorResponse;
            if (response.status === 400) {
              return this.errorToStringProvider.get(response.error)
                .pipe(
                  switchMap(content => {
                    if (content === "\"OTP_INVALID_REQUEST\"") {
                      this.store.dispatch(new OtpRequestErrorAction());
                    }
                    return throwError(error);
                  }));
            }
          }
          return throwError(error);
        })
      );
  }
}
