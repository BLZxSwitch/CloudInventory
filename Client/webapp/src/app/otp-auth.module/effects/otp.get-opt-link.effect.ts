import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthOtpServiceProxy } from "../../core/services/service-proxies";
import { OTPEnableFormAction } from "../actions/otp.enable-form.action";
import { OTPGetLinkFailureAction } from "../actions/otp.get-link-failure.action";
import { OTPGetLinkSuccessAction } from "../actions/otp.get-link-success.action";

@Injectable()
export class OTPGetOtpLinkEffect {

  @Effect()
  public effect$(): Observable<any> {
    return this.actions$.pipe(
      ofType<OTPEnableFormAction>(OTPEnableFormAction.type),
      exhaustMap(() =>
        this.authOtpServiceProxy.get()
          .pipe(
            map(otpLinkResponse => new OTPGetLinkSuccessAction(otpLinkResponse)),
            catchError(error => of(new OTPGetLinkFailureAction(error)))
          )
      )
    );
  }

  constructor(private actions$: Actions,
              private authOtpServiceProxy: AuthOtpServiceProxy) {
  }
}
