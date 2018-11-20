import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Logout } from "../../../auth/actions/auth.actions";
import * as fromAuth from "../../../auth/reducers";

@Injectable()
export class UnauthorizedRequestInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAuth.IState>) {

  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            const response = error as HttpErrorResponse;
            if (response.status === 401 || response.status === 403) {
              this.store.dispatch(new Logout());
            }
          }
          return throwError(error);
        })
      );
  }
}
