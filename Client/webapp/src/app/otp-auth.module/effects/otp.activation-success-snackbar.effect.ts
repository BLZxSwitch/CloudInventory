import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OTPActivationSuccessAction } from "../actions/otp.activation-request-success.action";

@Injectable()
export class OTPActivationSuccessSnackbarEffects {

  @Effect({dispatch: false})
  public effect$ = this.effectUtilsService.createSuccessSnackEffect(
    OTPActivationSuccessAction.type,
    "OTP.ENABLE_FORM.SUCCESS_ACTIVATION");

  constructor(private effectUtilsService: EffectUtilsService) {
  }
}
