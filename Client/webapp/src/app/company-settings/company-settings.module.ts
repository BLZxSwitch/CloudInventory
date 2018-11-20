import { InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { TenantSettingsServiceProxy } from "../core/services/service-proxies";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../shared.module/shared.module";
import { EffectUtilsService } from "../shared/services/effect-utils.service";
import { CompanySettingsRoutingModule } from "./company-settings.routing.module";
import { CompanySettingsFormComponent } from "./components/company-settings-form/company-settings-form.component";
import { CompanySettingsPageComponent } from "./containers/company-settings.page/company-settings.page.component";
import { CompanySettingsEffects } from "./effects/company-settings.effects";
import { COMPANY_SETTINGS, ICompanySettings, reducers } from "./reducers";

export const COMPANY_SETTINGS_FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<ICompanySettings>>("COMPANY SETTINGS Feature Reducers");

@NgModule({
  declarations: [
    CompanySettingsPageComponent,
    CompanySettingsFormComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    CompanySettingsRoutingModule,
    StoreModule.forFeature(COMPANY_SETTINGS, COMPANY_SETTINGS_FEATURE_REDUCER_TOKEN as any),
    EffectsModule.forFeature([CompanySettingsEffects])
  ],
  entryComponents: [],
  providers: [
    {
      provide: COMPANY_SETTINGS_FEATURE_REDUCER_TOKEN,
      useFactory: reducers
    },
    EffectUtilsService,
    TenantSettingsServiceProxy
  ]
})
export class CompanySettingsModule {
}
