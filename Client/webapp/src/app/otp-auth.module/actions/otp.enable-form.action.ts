import { Action } from "@ngrx/store";

export class OTPEnableFormAction implements Action {
  public static readonly type = "[OTP] enable form";

  public readonly type = OTPEnableFormAction.type;
}
