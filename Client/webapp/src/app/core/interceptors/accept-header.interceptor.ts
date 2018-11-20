import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "ng2-ui-auth";
import { Observable } from "rxjs";

@Injectable()
export class AcceptHeaderInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest = request.clone({
      setHeaders: {Accept: "application/json, text/plain, */*"},
    });

    return next.handle(clonedRequest);
  }
}
