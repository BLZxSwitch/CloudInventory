import { Action } from "@ngrx/store";
import { IOtpActivationRequest } from "./../../core/services/service-proxies";

export class OTPActivationRequestAction implements Action {
  public static readonly type = "[OTP] activation request";
  public readonly type = OTPActivationRequestAction.type;

  constructor(public payload: IOtpActivationRequest) {
  }
}
