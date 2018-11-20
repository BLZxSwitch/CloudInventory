import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthOtpServiceProxy, OtpDeactivationRequest } from "../../core/services/service-proxies";
import { OTPDeactivationFailureAction } from "../actions/otp.deactivation-request-failure.action";
import { OTPDeactivationSuccessAction } from "../actions/otp.deactivation-request-success.action";
import { OTPDeactivationRequestAction } from "../actions/otp.deactivation-request.action";

@Injectable()
export class OTPDeactivationRequestEffect {

  @Effect()
  public effect$(): Observable<any> {
    return this.actions$.pipe(
      ofType<OTPDeactivationRequestAction>(OTPDeactivationRequestAction.type),
      exhaustMap(value => this.authOtpServiceProxy.deactivate(
        OtpDeactivationRequest.fromJS(value.payload))
          .pipe(
            map(userSettings => new OTPDeactivationSuccessAction({userSettings})),
            catchError(error => of(new OTPDeactivationFailureAction(error)))
          ))
    );
  }

  constructor(private actions$: Actions,
              private authOtpServiceProxy: AuthOtpServiceProxy) {
  }
}
