import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/index";
import { first, map } from "rxjs/operators";
import { AuthProtectedRouteActivated } from "../../core/actions/app.actions";
import { LoginRedirect } from "../actions/auth.actions";
import * as fromAuth from "../reducers";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.IState>) {
  }

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }
        this.store.dispatch(new AuthProtectedRouteActivated());
        return true;
      }),
      first(),
    );
  }
}
