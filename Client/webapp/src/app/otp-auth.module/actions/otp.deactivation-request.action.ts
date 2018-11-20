import { Action } from "@ngrx/store";
import { IOtpDeactivationRequest } from "./../../core/services/service-proxies";

export class OTPDeactivationRequestAction implements Action {
  public static readonly type = "[OTP] deactivation request";
  public readonly type = OTPDeactivationRequestAction.type;

  constructor(public payload: IOtpDeactivationRequest) {
  }
}
