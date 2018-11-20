import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { OtpRedirect } from "../../../auth/actions/auth.actions";
import * as fromRoot from "../../../reducers";

@Injectable()
export class RetryWithHttpCodeInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.IState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            const response = error as HttpErrorResponse;
            if (response.status === 449) {
              this.onOtpCodeRequest(response.error);
            }
          }
          return throwError(error);
        })
      );
  }

  private onOtpCodeRequest(token: string) {
    this.store.dispatch(new OtpRedirect({token}));
  }
}
