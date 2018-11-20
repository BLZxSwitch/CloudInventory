import { Action } from "@ngrx/store";
import { OTPActivationFailureAction } from "../actions/otp.activation-request-failure.action";
import { OTPActivationRequestAction } from "../actions/otp.activation-request.action";
import { OTPDiscardChangesAction } from "../actions/otp.discard-changes.action";

export function otpErrorsReducer(state, action: Action): string {
  if (action instanceof OTPActivationFailureAction) {
    return action.payload;
  }
  if (action instanceof OTPActivationRequestAction) {
      return undefined;
  }
  if (action instanceof OTPDiscardChangesAction) {
    return undefined;
  }
  return state;
}
