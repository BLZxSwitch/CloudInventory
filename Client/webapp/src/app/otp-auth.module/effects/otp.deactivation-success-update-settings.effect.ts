import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { UserSettingsUpdateSuccess } from "../../auth/actions/user-settings.actions";
import { OTPDeactivationSuccessAction } from "../actions/otp.deactivation-request-success.action";

@Injectable()
export class OTPDeactivationSuccessUpdateSettingsEffects {

  @Effect()
  public effect$ = this.actions$.pipe(
    ofType<OTPDeactivationSuccessAction>(OTPDeactivationSuccessAction.type),
    map(action => action.payload),
    map(userSettings => new UserSettingsUpdateSuccess(userSettings))
  );

  constructor(private actions$: Actions) {
  }
}
