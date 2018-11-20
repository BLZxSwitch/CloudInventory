import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { UserSettingsUpdateSuccess } from "../../auth/actions/user-settings.actions";
import { OTPActivationSuccessAction } from "../actions/otp.activation-request-success.action";

@Injectable()
export class OTPActivationSuccessUpdateSettingsEffects {

  @Effect()
  public effect$ = this.actions$.pipe(
    ofType<OTPActivationSuccessAction>(OTPActivationSuccessAction.type),
    map(action => action.payload),
    map(userSettings => new UserSettingsUpdateSuccess(userSettings))
  );

  constructor(private actions$: Actions) {
  }
}
