import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpOfflineError } from "../../../shared/http-errors/http-offline-error";
import { NavigatorWebApiProvider } from "../../services/navigator.web-api.provider";

@Injectable()
export class HttpOfflineInterceptor implements HttpInterceptor {
  constructor(private navigatorWebApiProvider: NavigatorWebApiProvider) {

  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            const response = error as HttpErrorResponse;
            const onLine = this.navigatorWebApiProvider.get().onLine;
            if (response.status === 0 && onLine === false) {
              return throwError(new HttpOfflineError(error));
            }
          }
          return throwError(error);
        })
      );
  }
}
