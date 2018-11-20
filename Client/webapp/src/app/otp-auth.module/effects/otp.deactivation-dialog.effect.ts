import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OTPDeactivationSuccessAction } from "../actions/otp.deactivation-request-success.action";
import { OTPDisableFormAction } from "../actions/otp.disable-form.action";
import { OTPDiscardChangesAction } from "../actions/otp.discard-changes.action";
import { OTPDeactivationContainer } from "../containers/otp.deactivation/otp.deactivation.component";

@Injectable()
export class OTPDeactivationDialogEffect {

  @Effect()
  public effect$(): Observable<any> {
    return this.effectUtilsService.createOpenDialogEffect(
      [
        OTPDisableFormAction.type
      ],
      [
        OTPDeactivationSuccessAction.type
      ],
      OTPDeactivationContainer,
      OTPDiscardChangesAction,
      undefined,
      {
        panelClass: "narrow-padding-container"
      });
  }

  constructor(private effectUtilsService: EffectUtilsService) {
  }
}
