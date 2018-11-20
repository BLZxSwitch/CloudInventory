import { Action } from "@ngrx/store";

export class OTPGetLinkFailureAction implements Action {
  public static readonly type = "[OTP] get opt link failure";
  public readonly type = OTPGetLinkFailureAction.type;

  constructor(public payload: any) {
  }
}
