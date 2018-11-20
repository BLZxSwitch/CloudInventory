import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OTPDeactivationSuccessAction } from "../actions/otp.deactivation-request-success.action";

@Injectable()
export class OTPDeactivationSuccessSnackbarEffects {

  @Effect({dispatch: false})
  public effect$ = this.effectUtilsService.createSuccessSnackEffect(
    OTPDeactivationSuccessAction.type,
    "OTP.DISABLE_FORM.SUCCESS_DEACTIVATION");

  constructor(private effectUtilsService: EffectUtilsService) {
  }
}
