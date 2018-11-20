import { InjectionToken, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { UserServiceProxy } from "../core/services/service-proxies";
import { LayoutModule } from "../layout/layout.module";
import { InvalidOtpCodeError } from "../otp-auth.module/errors/otp-code-invalid.error";
import { InvalidOtpTokenError } from "../otp-auth.module/errors/otp-token-invalid.error";
import { SharedModule } from "../shared.module/shared.module";
import { EffectUtilsService } from "../shared/services/effect-utils.service";
import { ROUTES } from "./auth.routes";
import { ForgotPasswordFormComponent } from "./components/forgot-password-form/forgot-password-form.component";
import { ForgotPasswordSuccessComponent } from "./components/forgot-password-success/forgot-password-success.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { OtpEnterCodeFormComponent } from "./components/otp-enter-code-form/otp-enter-code-form.component";
import { ResetPasswordFormComponent } from "./components/reset-password-form/reset-password-form.component";
import { SetPasswordFormComponent } from "./components/set-password-form/set-password-form.component";
import { ForgotPasswordPageComponent } from "./containers/forgot-password-page/forgot-password-page.component";
import { ForgotPasswordSuccessPageComponent } from "./containers/forgot-password-success-page/forgot-password-success-page.component";
import { LoginPageComponent } from "./containers/login-page.component";
import { OtpEnterCodeComponent } from "./containers/otp-enter-code.page/otp-enter-code.component";
import { ResetPasswordPageComponent } from "./containers/reset-password-page/reset-password-page.component";
import { SetPasswordPageComponent } from "./containers/set-password-page/set-password-page.component";
import { AuthEffects } from "./effects/auth.effects";
import { LoginFailedError } from "./errors/login-failed.error";
import { TokenIsInvalidError } from "./errors/token-is-invalid.error";
import { UserInactiveError } from "./errors/user-inactive.error";
import { IAuthState, reducers } from "./reducers";
import { AuthGuard } from "./services/auth-guard.service";

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  ForgotPasswordPageComponent,
  ForgotPasswordFormComponent,
  ForgotPasswordSuccessPageComponent,
  ForgotPasswordSuccessComponent,
  ResetPasswordPageComponent,
  ResetPasswordFormComponent,
  SetPasswordPageComponent,
  SetPasswordFormComponent,
  OtpEnterCodeComponent,
  OtpEnterCodeFormComponent
];

export const AUTH_FEATURE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<IAuthState>>("Auth Feature Reducers");

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("auth", AUTH_FEATURE_REDUCER_TOKEN as any),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    UserServiceProxy,
    EffectUtilsService,
    AuthGuard,
    {
      provide: AUTH_FEATURE_REDUCER_TOKEN,
      useFactory: reducers
    },
    LoginFailedError,
    InvalidOtpCodeError,
    InvalidOtpTokenError,
    TokenIsInvalidError,
    UserInactiveError,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class AuthModule {
}
