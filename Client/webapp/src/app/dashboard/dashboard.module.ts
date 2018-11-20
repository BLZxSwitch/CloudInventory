import { InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";

import { DashboardServiceProxy } from "../core/services/service-proxies";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../shared.module/shared.module";
import { EffectUtilsService } from "../shared/services/effect-utils.service";
import { DashboardItemListComponent } from "./components/dashboard-item-list/dashboard-item-list.component";
import { DashboardItemComponent } from "./components/dashboard-item/dashboard-item.component";
import { DashboardPageComponent } from "./containers/dashboard.page/dashboard.page.component";
import { DashboardRoutingModule } from "./dashboard.routing.module";
import { DashboardEffects } from "./effects/dashboard.effects";
import { DASHBOARD, IDashboardState, reducers } from "./reducers";

export const DASHBOARD_FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<IDashboardState>>("DASHBOARD Feature Reducers");

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardItemListComponent,
    DashboardItemComponent,
  ],
  imports: [
    DashboardRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    LayoutModule,
    StoreModule.forFeature(DASHBOARD, DASHBOARD_FEATURE_REDUCER_TOKEN as any),
    EffectsModule.forFeature([DashboardEffects])
  ],
  providers: [
    {
      provide: DASHBOARD_FEATURE_REDUCER_TOKEN,
      useFactory: reducers
    },
    EffectUtilsService,
    DashboardServiceProxy,
  ],
  entryComponents: [
  ]
})
export class DashboardModule {
}
