import { Action } from "@ngrx/store";
import { UserSettingsDTO } from "../../core/services/service-proxies";

export class OTPActivationSuccessAction implements Action {
  public static readonly type = "[OTP] activation success";
  public readonly type = OTPActivationSuccessAction.type;

  constructor(public payload: { userSettings: UserSettingsDTO; }) {
  }
}
