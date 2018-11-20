import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import * as fromRoot from "../../../reducers";
import { HttpInternalServerError } from "../../../shared/http-errors/http-internal-server-error";

@Injectable()
export class HttpInternalServerErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.IState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            const response = error as HttpErrorResponse;
            if (response.status === 500) {
              return throwError(new HttpInternalServerError(error));
            }
          }
          return throwError(error);
        })
      );
  }
}
