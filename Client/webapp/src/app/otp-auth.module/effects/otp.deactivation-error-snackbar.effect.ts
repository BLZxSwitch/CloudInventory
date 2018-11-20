import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OTPDeactivationFailureAction } from "../actions/otp.deactivation-request-failure.action";

@Injectable()
export class OTPDeactivationErrorSnackbarEffects {

  @Effect({dispatch: false})
  public effect$ = this.effectUtilsService.createErrorSnackEffect(
    OTPDeactivationFailureAction.type);

  constructor(private effectUtilsService: EffectUtilsService) {
  }
}
