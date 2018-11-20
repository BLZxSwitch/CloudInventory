import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { EffectsModule } from "@ngrx/effects";
import { RouterStateSerializer, StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Ng2UiAuthModule } from "ng2-ui-auth";
import { NgxCaptchaModule } from "ngx-captcha";
import { environment } from "../environments/environment";
import { AuthModule } from "./auth/auth.module";
import { AppComponent } from "./core/containers/app.component";
import { CoreModule } from "./core/core.module";
import { SnackEffect } from "./core/effects/snack.effect";
import { API_BASE_URL } from "./core/services/service-proxies";
import { metaReducers, reducers } from "./reducers";
import { ROUTES } from "./routes";
import { CustomRouterStateSerializer } from "./shared.module/utils";
import { TermsOfServiceModule } from "./terms-of-service/terms-of-service.module";
import { UpdateApplicationModule } from "./update-application.module/update-application.module";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function ng2UiAuthModuleResolveToken({token}) {
  return token;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgxCaptchaModule,
    UpdateApplicationModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {enabled: environment.production}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Ng2UiAuthModule.forRoot({
      baseUrl: environment.BASE_URL,
      loginUrl: "api/auth/signin",
      signupUrl: "api/CompanyRegister/Register",
      resolveToken: ng2UiAuthModuleResolveToken
    }),
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: "router"
    }),
    StoreDevtoolsModule.instrument({
      name: "NgRx DevTools",
      logOnly: environment.production
    }),
    EffectsModule.forRoot([SnackEffect]),
    CoreModule,
    AuthModule,
    TermsOfServiceModule,
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    {provide: API_BASE_URL, useValue: environment.BASE_URL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
