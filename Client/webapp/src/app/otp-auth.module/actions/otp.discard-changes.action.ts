import { Action } from "@ngrx/store";

export class OTPDiscardChangesAction implements Action {
  public static readonly type = "[OTP] discard changes";
  public readonly type = OTPDiscardChangesAction.type;
}
