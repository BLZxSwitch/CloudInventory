import { Action } from "@ngrx/store";

export class OTPActivationFailureAction implements Action {
  public static readonly type = "[OTP] activation failure";
  public readonly type = OTPActivationFailureAction.type;

  constructor(public payload: any) {
  }
}
