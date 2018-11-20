import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { TermsOfServiceServiceProxy } from "../core/services/service-proxies";
import { SharedModule } from "../shared.module/shared.module";
import { TermsOfServiceDialogComponent } from "./containers/terms-of-service-dialog/terms-of-service-dialog.component";
import { TermsOfServiceEffects } from "./effects/terms-of-service.effects";
import { TermsOfServiceInterceptor } from "./interceptors/terms-of-service/terms-of-service.interceptor";

@NgModule({
  declarations: [
    TermsOfServiceDialogComponent
  ],
  imports: [
    SharedModule,
    EffectsModule.forFeature([TermsOfServiceEffects]),
  ],
  providers: [
    TermsOfServiceServiceProxy,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TermsOfServiceInterceptor,
      multi: true
    },
  ],
  entryComponents: [
    TermsOfServiceDialogComponent,
  ],
})
export class TermsOfServiceModule {
}
