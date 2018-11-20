import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import {
  EmployeesServiceProxy,
  InvitationServiceProxy,
} from "../core/services/service-proxies";
import { EmployeesEffects } from "./effects/employees.effects";
import { DATA, reducers } from "./reducers";

@NgModule({
  imports: [
    StoreModule.forFeature(DATA, reducers),
    EffectsModule.forFeature([
      EmployeesEffects
    ]),
  ],
  declarations: [],
  entryComponents: [],
  providers: [
    EmployeesServiceProxy,
    InvitationServiceProxy
  ]
})
export class DataModule {
}
