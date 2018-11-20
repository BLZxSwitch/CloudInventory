import { LAZY_MAPS_API_CONFIG, LazyMapsAPILoader } from "@agm/core";
import { BROWSER_GLOBALS_PROVIDERS } from "@agm/core/utils/browser-globals";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { TranslateModule } from "@ngx-translate/core";
import { LocalStorageModule } from "angular-2-local-storage";
import { DeviceDetectorModule } from "ngx-device-detector";
import { NgxMaskModule } from "ngx-mask";
import { environment } from "../../environments/environment";
import { DataModule } from "../data/data.module";
import { SharedModule } from "../shared.module/shared.module";
import { NotFoundPageComponent } from "./containers/not-found-page.component";
import { DisconnectableBehaviorFactory } from "./disconnectable/disconnectable-behavior.factory";
import { InitEmployeesStateEffect } from "./effects/init-employees-state.effect";
import { OpenAddDialogEffect } from "./effects/open-add-dialog.effect";
import { UnspecifiedBadRequestError } from "./errors/unspecified-bad-request.error";
import { AcceptedLanguageInterceptor } from "./interceptors/accepted-language.interceptor";
import { BadRequestInterceptor } from "./interceptors/bad-request/bad-request.interceptor";
import { HttpInternalServerErrorInterceptor } from "./interceptors/http-internal-server-error/http-internal-server-error.interceptor";
import { HttpOfflineInterceptor } from "./interceptors/http-offline/http-offline.interceptor";
import {
  InvalidOtpActivationRequestInterceptor
} from "./interceptors/invalid-otp-request/invalid-otp-request.interceptor";
import { HttpLoadingIndicatorInterceptor } from "./interceptors/loading-indicator/http-loading-indicator.interceptor";
import { RenewedTokenInterceptor } from "./interceptors/renewed-token/renewed-token.interceptor";
import { RetryWithHttpCodeInterceptor } from "./interceptors/retry-with/retry-with-http-code.interceptor";
import { UnauthorizedRequestInterceptor } from "./interceptors/unauthorized-request/unauthorized-request.interceptor";
import { InitStateEffectFactory } from "./services/effect-factories/init-state-effect.factory";
import { LogoutEffectFactory } from "./services/effect-factories/logout-effect.factory";
import { SingleTimeEffectFactory } from "./services/effect-factories/single-time-effect.factory";
import { InitialMonthProvider } from "./services/initial-month.provider";
import { InputDebouncePipeBehavior } from "./services/input-debounce/input-debounce.pipe-behavior";
import { LanguageService } from "./services/language.service";
import { RoutesService } from "./services/routes.service";
import {
  AuthServiceProxy,
  CaptchaServiceProxy,
  CompanyNameTakenServiceProxy,
  EmailTakenServiceProxy,
  UserPictureServiceProxy
} from "./services/service-proxies";
import { CompanyNameNotTakenValidator } from "./validators/company-name-not-taken.validator";
import { EmailNotTakenValidator } from "./validators/email-not-taken.validator";

export const COMPONENTS = [
  NotFoundPageComponent
];

const GOOGLE_MAPS_PROVIDERS = [
  ...BROWSER_GLOBALS_PROVIDERS,
  LazyMapsAPILoader,
  {
    provide: LAZY_MAPS_API_CONFIG, useValue: {
      apiKey: environment.GOOGLE_PLACES_API_KEY,
      libraries: ["places"]
    }
  }
];

@NgModule({
  imports: [
    DataModule,
    SharedModule,
    RouterModule,
    EffectsModule.forFeature([
      InitEmployeesStateEffect,
      OpenAddDialogEffect,
    ]),
    TranslateModule.forChild(),
    LocalStorageModule.withConfig({
      prefix: "pr",
      storageType: "localStorage"
    }),
    NgxMaskModule.forRoot(),
    DeviceDetectorModule.forRoot()
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    ...GOOGLE_MAPS_PROVIDERS,
    InitialMonthProvider,
    RoutesService,
    AuthServiceProxy,
    UserPictureServiceProxy,
    CompanyNameTakenServiceProxy,
    EmailTakenServiceProxy,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RenewedTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpOfflineInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInternalServerErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryWithHttpCodeInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BadRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedRequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AcceptedLanguageInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingIndicatorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidOtpActivationRequestInterceptor,
      multi: true
    },
    CompanyNameNotTakenValidator,
    EmailNotTakenValidator,
    UnspecifiedBadRequestError,
    InitStateEffectFactory,
    LogoutEffectFactory,
    DisconnectableBehaviorFactory,
    SingleTimeEffectFactory,
    LanguageService,
    InputDebouncePipeBehavior,
    CaptchaServiceProxy
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only");
    }
  }
}
