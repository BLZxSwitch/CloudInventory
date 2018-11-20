import { Action } from "@ngrx/store";

export class OTPDisableFormAction implements Action {
  public static readonly type = "[OTP] disable form";

  public readonly type = OTPDisableFormAction.type;
}
