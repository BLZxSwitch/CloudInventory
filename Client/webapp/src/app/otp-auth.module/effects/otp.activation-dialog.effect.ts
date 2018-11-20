import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { OtpRequestErrorAction } from "../../core/actions/otp-request-error.action";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OTPActivationSuccessAction } from "../actions/otp.activation-request-success.action";
import { OTPDiscardChangesAction } from "../actions/otp.discard-changes.action";
import { OTPGetLinkSuccessAction } from "../actions/otp.get-link-success.action";
import { OTPActivationContainer } from "../containers/otp.activation/otp.activation.component";

@Injectable()
export class OTPActivationDialogEffect {

  @Effect()
  public effect$(): Observable<any> {
    return this.effectUtilsService.createOpenDialogEffect(
      [
        OTPGetLinkSuccessAction.type
      ],
      [
        OTPActivationSuccessAction.type,
        OtpRequestErrorAction.type
      ],
      OTPActivationContainer,
      OTPDiscardChangesAction,
      undefined,
      {
        panelClass: "narrow-padding-container"
      });
  }

  constructor(private effectUtilsService: EffectUtilsService) {
  }
}
