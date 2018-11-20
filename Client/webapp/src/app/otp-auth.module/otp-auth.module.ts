import { NgModule } from "@angular/core";
import { MatStepperModule } from "@angular/material";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { QRCodeModule } from "angularx-qrcode";
import { AuthOtpServiceProxy } from "../core/services/service-proxies";
import { SharedModule } from "../shared.module/shared.module";
import { EffectUtilsService } from "../shared/services/effect-utils.service";
import { OTPActivationFormComponent } from "./components/otp.activation.form/otp.activation.form.component";
import { OTPDeactivationFormComponent } from "./components/otp.deactivation.form/otp.deactivation.form.component";
import { OTPGeneratorFormComponent } from "./components/otp.generator.form/otp.generator.form.component";
import { OTPInstallerFormComponent } from "./components/otp.installer.form/otp.installer.form.component";
import { OTPValidatorFormComponent } from "./components/otp.validator.form/otp.validator.form.component";
import { OTPActivationContainer } from "./containers/otp.activation/otp.activation.component";
import { OTPDeactivationContainer } from "./containers/otp.deactivation/otp.deactivation.component";
import { OTPSettingsComponent } from "./containers/otp.settings/otp.settings.component";
import { OTPActivationDialogEffect } from "./effects/otp.activation-dialog.effect";
import { OTPActivationRequestEffect } from "./effects/otp.activation-request.effect";
import { OTPActivationSuccessSnackbarEffects } from "./effects/otp.activation-success-snackbar.effect";
import { OTPActivationSuccessUpdateSettingsEffects } from "./effects/otp.activation-success-update-settings.effect";
import { OTPDeactivationDialogEffect } from "./effects/otp.deactivation-dialog.effect";
import { OTPDeactivationErrorSnackbarEffects } from "./effects/otp.deactivation-error-snackbar.effect";
import { OTPDeactivationRequestEffect } from "./effects/otp.deactivation-request.effect";
import { OTPDeactivationSuccessSnackbarEffects } from "./effects/otp.deactivation-success-snackbar.effect";
import { OTPDeactivationSuccessUpdateSettingsEffects } from "./effects/otp.deactivation-success-update-settings.effect";
import { OTPGetOtpLinkEffect } from "./effects/otp.get-opt-link.effect";
import { InvalidPasswordError } from "./errors/invalid-password.error";
import { InvalidRequestError } from "./errors/invalid-request.error";
import { InvalidOtpCodeError } from "./errors/otp-code-invalid.error";
import { OTP_AUTH_FEATURE_NAME } from "./otp-auth.feature-name";
import { reducers } from "./reducers/reducers-map";
import { ActivationFormProvider } from "./services/activation.form.provider";
import { DeactivationFormProvider } from "./services/deactivate.form.provider";

const COMPONENTS = [
  OTPSettingsComponent,
  OTPActivationContainer,
  OTPActivationFormComponent,
  OTPInstallerFormComponent,
  OTPGeneratorFormComponent,
  OTPValidatorFormComponent,
  OTPDeactivationContainer,
  OTPDeactivationFormComponent
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    QRCodeModule,
    MatStepperModule,
    TranslateModule.forChild(),
    SharedModule,
    StoreModule.forFeature(OTP_AUTH_FEATURE_NAME, reducers()),
    EffectsModule.forFeature([
      OTPGetOtpLinkEffect,
      OTPActivationDialogEffect,
      OTPActivationRequestEffect,
      OTPActivationSuccessSnackbarEffects,
      OTPActivationSuccessUpdateSettingsEffects,
      OTPDeactivationDialogEffect,
      OTPDeactivationRequestEffect,
      OTPDeactivationSuccessSnackbarEffects,
      OTPDeactivationSuccessUpdateSettingsEffects,
      OTPDeactivationErrorSnackbarEffects
    ])
  ],
  exports: COMPONENTS,
  providers: [
    EffectUtilsService,
    ActivationFormProvider,
    AuthOtpServiceProxy,
    InvalidPasswordError,
    InvalidOtpCodeError,
    InvalidRequestError,
    DeactivationFormProvider
  ],
  entryComponents: [
    OTPActivationContainer,
    OTPDeactivationContainer
  ]
})
export class OTPAuthModule {
}
