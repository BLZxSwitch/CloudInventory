import { ActionReducerMap } from "@ngrx/store";
import { IOtpAuthState } from "../store/otp-auth.state";
import { otpErrorsReducer } from "./otp.errors.reducer";
import { otpLinkReducer } from "./otp.otp-link.reducer";

export function reducers(): ActionReducerMap<IOtpAuthState> {
  return {
    otpLink: otpLinkReducer,
    error: otpErrorsReducer
  };
}
