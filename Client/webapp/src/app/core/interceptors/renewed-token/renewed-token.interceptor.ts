import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponseBase } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "ng2-ui-auth";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class RenewedTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponseBase) {
            const response = (event as HttpResponseBase);
            if (response.headers.has("X-Renewed-Token") === true) {
              const renewedToken = response.headers.get("X-Renewed-Token");
              this.auth.setToken(renewedToken);
            }
          }
        })
      );
  }
}
