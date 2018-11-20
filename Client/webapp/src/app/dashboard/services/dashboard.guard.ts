import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { DashboardActionTypes, DashboardSummaryRequest } from "../actions/dashboard.actions";
import * as fromDashboard from "../reducers/dashboard.reducer";

@Injectable({
  providedIn: "root"
})
export class DashboardGuard implements CanActivate {

  constructor(private store: Store<fromDashboard.IState>, private actions$: Actions) {
  }

  public canActivate(): Observable<boolean> {
    this.store.dispatch(new DashboardSummaryRequest());

    return this.actions$.pipe(
      ofType(DashboardActionTypes.DashboardSummarySuccess, DashboardActionTypes.DashboardSummaryFailure),
      first(),
      map(() => true)
    );
  }
}
