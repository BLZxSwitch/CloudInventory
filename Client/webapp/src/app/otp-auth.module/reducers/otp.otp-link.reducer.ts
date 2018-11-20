import { Action } from "@ngrx/store";
import { IOtpGetLinkResponse } from "../../core/services/service-proxies";
import { OTPGetLinkSuccessAction } from "../actions/otp.get-link-success.action";

export function otpLinkReducer(state, action: Action): IOtpGetLinkResponse {
  if (action instanceof OTPGetLinkSuccessAction) {
    return {
      ...action.payload
    };
  }
  return state;
}
