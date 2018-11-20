import { Action } from "@ngrx/store";
import { IOtpGetLinkResponse } from "../../core/services/service-proxies";

export class OTPGetLinkSuccessAction implements Action {
  public static readonly type = "[OTP] get link success";
  public readonly type = OTPGetLinkSuccessAction.type;

  constructor(public payload: IOtpGetLinkResponse) {
  }
}
