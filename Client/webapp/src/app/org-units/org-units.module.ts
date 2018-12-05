import { InjectionToken, NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule } from "@ngrx/store";
import { TranslateModule } from "@ngx-translate/core";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../shared.module/shared.module";
import { EffectUtilsService } from "../shared/services/effect-utils.service";
import { OrgUnitFormComponent } from "./components/org-unit-form/org-unit-form.component";
import { OrgUnitsFilterFormComponent } from "./components/org-units.filter/org-units.filter-form.component";
import { OrgUnitsListItemComponent } from "./components/org-units.list-item/org-units.list-item.component";
import { OrgUnitDialogContainer } from "./containers/org-unit-dialog/org-unit-dialog.container";
import { OrgUnitsFilterContainer } from "./containers/org-units.filter/org-units.filter.container";
import { OrgUnitsListContainer } from "./containers/org-units.list/org-units.list.container";
import { OrgUnitsPageContainer } from "./containers/org-units.page/org-units.page.container";
import { OrgUnitsEffects } from "./effects/org-units.effects";
import { OrgUnitsDeleteError } from "./errors/org-units.delete.error";
import { OrgUnitsRoutingModule } from "./org-units.routing.module";
import { IOrgUnitsStore, ORG_UNITS, reducers } from "./reducers";
import { AutoSubmitPipeBehavior } from "./services/auto-submit.pipe-behavior";
import { OrgUnitsEditFormProvider } from "./services/org-units.edit-form.provider";
import { OrgUnitsFilterFormProvider } from "./services/org-units.filter-form.provider";

export const ORG_UNITS_FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<IOrgUnitsStore>>("ORG UNITS Feature Reducers");

@NgModule({
  declarations: [
    OrgUnitsPageContainer,
    OrgUnitsListContainer,
    OrgUnitsFilterContainer,
    OrgUnitsFilterFormComponent,
    OrgUnitDialogContainer,
    OrgUnitFormComponent,
    OrgUnitsListItemComponent
  ],
  imports: [
    OrgUnitsRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
    LayoutModule,
    StoreModule.forFeature(ORG_UNITS, ORG_UNITS_FEATURE_REDUCER_TOKEN as any),
    EffectsModule.forFeature([OrgUnitsEffects])
  ],
  providers: [
    {
      provide: ORG_UNITS_FEATURE_REDUCER_TOKEN,
      useFactory: reducers
    },
    OrgUnitsFilterFormProvider,
    AutoSubmitPipeBehavior,
    OrgUnitsEditFormProvider,
    EffectUtilsService,
    OrgUnitsDeleteError
  ],
  entryComponents: [
    OrgUnitFormComponent,
    OrgUnitsPageContainer,
    OrgUnitDialogContainer
  ]
})
export class OrgUnitsModule {
}
