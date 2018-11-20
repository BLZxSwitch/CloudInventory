import { Routes } from "@angular/router";
import { NotFoundPageComponent } from "../core/containers/not-found-page.component";
import { ForgotPasswordPageComponent } from "./containers/forgot-password-page/forgot-password-page.component";
import { ForgotPasswordSuccessPageComponent } from "./containers/forgot-password-success-page/forgot-password-success-page.component";
import { LoginPageComponent } from "./containers/login-page.component";
import { OtpEnterCodeComponent } from "./containers/otp-enter-code.page/otp-enter-code.component";
import { ResetPasswordPageComponent } from "./containers/reset-password-page/reset-password-page.component";
import { SetPasswordPageComponent } from "./containers/set-password-page/set-password-page.component";

export const AUTH = "auth";
export const LOGIN = "login";
export const CREATE = "create";
export const FORGOT = "forgot";
export const FORGOT_SUCCESS = "forgot_success";
export const RESET = "reset";
export const SET_PASSWORD = "set-password";
export const OTP_ENTER_CODE = "otp-enter-code";

export const ROUTES: Routes = [
  {
    path: AUTH,
    children: [
      {path: LOGIN, component: LoginPageComponent},
      {path: CREATE, component: NotFoundPageComponent},
      {path: FORGOT, component: ForgotPasswordPageComponent},
      {path: FORGOT_SUCCESS, component: ForgotPasswordSuccessPageComponent},
      {path: RESET, component: ResetPasswordPageComponent},
      {path: SET_PASSWORD, component: SetPasswordPageComponent},
      {path: OTP_ENTER_CODE, component: OtpEnterCodeComponent},
    ],
  },
];
