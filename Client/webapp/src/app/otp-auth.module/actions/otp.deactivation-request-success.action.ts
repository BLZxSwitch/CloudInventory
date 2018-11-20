import { Action } from "@ngrx/store";
import { UserSettingsDTO } from "../../core/services/service-proxies";

export class OTPDeactivationSuccessAction implements Action {
  public static readonly type = "[OTP] deactivation success";
  public readonly type = OTPDeactivationSuccessAction.type;

  constructor(public payload: { userSettings: UserSettingsDTO; }) {
  }
}
