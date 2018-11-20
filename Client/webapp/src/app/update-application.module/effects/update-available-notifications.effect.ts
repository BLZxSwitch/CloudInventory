import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { interval } from "rxjs";
import { catchError, filter, flatMap, map, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { ReloadService } from "../../core/services/reload.service";
import { ReloadApplicationAction, UpdateApplicationActionTypes } from "../actions/update-application.actions";
import { UpdateApplicationSnackBarService } from "../services/update-application-snack-bar.service";

@Injectable()
export class UpdateAvailableNotificationEffects {

  @Effect({dispatch: false})
  public effect$ = interval(environment.updateAppIntervalSec * 1000)
    .pipe(
      filter(() => this.swUpdate.isEnabled),
      flatMap(() => this.swUpdate.checkForUpdate()),
      map(() => {
        return undefined;
      })
    );

  @Effect({dispatch: false})
  public effectOnUpdate$ = this.swUpdate.available
    .pipe(
      tap(() => this.updateApplicationSnackBarService.openNotification()),
      map(() => {
        return undefined;
      })
    );

  @Effect({dispatch: false})
  public effectOnReload$ = this.actions$
    .pipe(
      ofType<ReloadApplicationAction>(UpdateApplicationActionTypes.ReloadApplicationAction),
      flatMap(() => {
        return this.swUpdate.activateUpdate();
      }),
      map(() => {
        this.reloadService.reload();
        return undefined;
      }),
      catchError(err => {
        console.log("[Update Application] catchError");
        console.error(err);
        return undefined;
      })
  );

  constructor(private actions$: Actions,
              private swUpdate: SwUpdate,
              private reloadService: ReloadService,
              private updateApplicationSnackBarService: UpdateApplicationSnackBarService) {
  }
}
