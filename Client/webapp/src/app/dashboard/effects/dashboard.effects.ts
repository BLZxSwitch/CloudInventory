import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";

import { DashboardServiceProxy } from "../../core/services/service-proxies";
import {
  DashboardActionTypes,
  DashboardSummaryFailure,
  DashboardSummaryRequest,
  DashboardSummarySuccess,

} from "../actions/dashboard.actions";

@Injectable()
export class DashboardEffects {

  @Effect()
  public loadSummary$ = this.actions$.pipe(
    ofType<DashboardSummaryRequest>(DashboardActionTypes.DashboardSummaryRequest),
    exhaustMap(() => this.dashboardServiceProxy.getSummary()
      .pipe(
        map(dashboardSummaryResponse => new DashboardSummarySuccess({dashboardSummaryResponse})),
        catchError(error => of(new DashboardSummaryFailure(error)))
      )
    )
  );

  constructor(private actions$: Actions,
              private dashboardServiceProxy: DashboardServiceProxy) {
  }
}
