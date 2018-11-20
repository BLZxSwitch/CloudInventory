import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import * as fromRoot from "../../../reducers";
import { HttpFinalized, HttpStarted } from "../../actions/htpp-loading-indicator.actions";

@Injectable()
export class HttpLoadingIndicatorInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromRoot.IState>) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environment.globalIndicatorExcludeUrls.filter(item => request.url.search(item) >= 0).length > 0) {
      return next.handle(request);
    }
    this.onHttpStarted();
    return next.handle(request)
    .pipe(
      finalize(() => {
        this.onHttpFinalized();
      })
    );
  }

  public onHttpStarted() {
    this.store.dispatch(new HttpStarted());
  }

  public onHttpFinalized() {
    this.store.dispatch(new HttpFinalized());
  }
}
