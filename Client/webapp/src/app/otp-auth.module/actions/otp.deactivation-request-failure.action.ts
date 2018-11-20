import { Action } from "@ngrx/store";

export class OTPDeactivationFailureAction implements Action {
  public static readonly type = "[OTP] deactivation failure";
  public readonly type = OTPDeactivationFailureAction.type;

  constructor(public payload: any) {
  }
}
