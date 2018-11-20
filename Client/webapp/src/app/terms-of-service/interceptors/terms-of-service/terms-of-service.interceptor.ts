import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError, first, switchMap } from "rxjs/operators";
import { HttpFinalized, HttpStarted } from "../../../core/actions/htpp-loading-indicator.actions";
import { ErrorToStringProvider } from "../../../core/interceptors/bad-request/error-to-string.provider";
import { TermsOfServiceActionTypes, TermsOfServiceApprove } from "../../actions/terms-of-service.actions";

@Injectable()
export class TermsOfServiceInterceptor implements HttpInterceptor {
  constructor(private store: Store<any>,
              private actions$: Actions,
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
                .pipe(switchMap(content => {
                  if (content.replace(/"/g, "") === "TOS_IS_NOT_ACCEPTED") {
                    this.store.dispatch(new HttpFinalized());
                    this.store.dispatch(new TermsOfServiceApprove());
                    return this.actions$.pipe(
                      ofType(TermsOfServiceActionTypes.ApproveSuccess, TermsOfServiceActionTypes.Decline),
                      first(),
                      switchMap(({type}) => {
                        switch (type) {
                          case TermsOfServiceActionTypes.ApproveSuccess:
                            return next.handle(request);
                          case TermsOfServiceActionTypes.Decline:
                            return throwError(error);
                        }
                        this.store.dispatch(new HttpStarted());
                      })
                    );
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
