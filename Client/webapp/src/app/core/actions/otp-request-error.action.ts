import { Action } from "@ngrx/store";

export class OtpRequestErrorAction implements Action {
  public static type = "[OTP] request error";
  public readonly type = OtpRequestErrorAction.type;
}
