import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { combineLatest } from "rxjs/index";
import { first, map } from "rxjs/operators";
import { LoginRedirect } from "../../auth/actions/auth.actions";
import * as fromAuth from "../../auth/reducers";

@Injectable()
export class OrgUnitOrUserGuard implements CanActivate {
  constructor(private store: Store<fromAuth.IState>) {
  }

  public canActivate(): Observable<boolean> {
    return combineLatest(
      this.store.pipe(select(fromAuth.isAdmin)),
    ).pipe(
      map(([isAdmin]) => {
        if (isAdmin) {
          this.store.dispatch(new LoginRedirect());
          return false;
        }
        return true;
      }),
      first(),
    );
  }
}
