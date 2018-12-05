import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {
  EmployeesServiceProxy,
  InvitationServiceProxy,
  OrgUnitsServiceProxy,
} from "../core/services/service-proxies";
import { OrgUnitsListContainer } from "../org-units/containers/org-units.list/org-units.list.container";
import { EmployeesEffects } from "./effects/employees.effects";
import { OrgUnitsCollectionEffects } from "./effects/org-units-collection.effects";
import { DATA, reducers } from "./reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(DATA, reducers),
    EffectsModule.forFeature([
      EmployeesEffects,
      OrgUnitsCollectionEffects
    ]),
  ],
  declarations: [],
  entryComponents: [],
  providers: [
    EmployeesServiceProxy,
    InvitationServiceProxy,
    OrgUnitsServiceProxy,
    OrgUnitsListContainer
  ]
})
export class DataModule {
}
