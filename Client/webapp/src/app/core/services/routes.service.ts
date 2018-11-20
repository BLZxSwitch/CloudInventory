import { Injectable } from "@angular/core";
import { AUTH, FORGOT, FORGOT_SUCCESS, LOGIN, OTP_ENTER_CODE } from "../../auth/auth.routes";
import { Memoize } from "./memoize.decorator";

export const COMPANY_REGISTER = "company-register";
export const STAFF = "staff";
export const MY_SETTINGS = "my-settings";
export const COMPANY_SETTINGS = "company-settings";
export const DASHBOARD = "dashboard";
export const NEW = "new";
export const TERMS_OF_SERVICE = "terms-of-service";

@Injectable()
export class RoutesService {

  @Memoize()
  public staff = () => ["/", STAFF];

  @Memoize()
  public staffNew = () => ["/", STAFF, NEW];

  @Memoize()
  public companyRegister = () => ["/", COMPANY_REGISTER];

  @Memoize()
  public mySettings = () => ["/", MY_SETTINGS];

  @Memoize()
  public companySettings = () => ["/", COMPANY_SETTINGS];

  @Memoize()
  public dashboard = () => ["/", DASHBOARD];

  @Memoize()
  public termsOfService = () => ["/", TERMS_OF_SERVICE];

  @Memoize()
  public authForgotPassword = () => ["/", AUTH, FORGOT];

  @Memoize()
  public authLogin = () => ["/", AUTH, LOGIN];

  @Memoize()
  public authForgotPasswordSuccess = () => ["/", AUTH, FORGOT_SUCCESS];

  @Memoize()
  public authOtpEnterCode = () => ["/", AUTH, OTP_ENTER_CODE];
}
