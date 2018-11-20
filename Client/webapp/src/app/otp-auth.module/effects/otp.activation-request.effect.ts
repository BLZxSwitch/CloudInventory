import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthOtpServiceProxy, OtpActivationRequest } from "../../core/services/service-proxies";
import { OTPActivationFailureAction } from "../actions/otp.activation-request-failure.action";
import { OTPActivationSuccessAction } from "../actions/otp.activation-request-success.action";
import { OTPActivationRequestAction } from "../actions/otp.activation-request.action";

@Injectable()
export class OTPActivationRequestEffect {

  @Effect()
  public effect$(): Observable<any> {
    return this.actions$.pipe(
      ofType<OTPActivationRequestAction>(OTPActivationRequestAction.type),
      exhaustMap(value => this.authOtpServiceProxy.activate(
        OtpActivationRequest.fromJS(value.payload))
          .pipe(
            map(userSettings => new OTPActivationSuccessAction({userSettings})),
            catchError(error => of(new OTPActivationFailureAction(error)))
          ))
    );
  }

  constructor(private actions$: Actions,
              private authOtpServiceProxy: AuthOtpServiceProxy) {
  }
}
