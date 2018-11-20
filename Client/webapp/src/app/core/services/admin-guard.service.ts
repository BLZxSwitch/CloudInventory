import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { LoginRedirect } from "../../auth/actions/auth.actions";
import * as fromAuth from "../../auth/reducers";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private store: Store<fromAuth.IState>) {
  }

  public canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromAuth.isAdmin),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }

        return true;
      }),
      first(),
    );
  }
}
