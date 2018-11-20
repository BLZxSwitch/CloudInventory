import {InjectionToken, NgModule} from "@angular/core";
import {EffectsModule} from "@ngrx/effects";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {EmployeesServiceProxy} from "../core/services/service-proxies";
import { LayoutModule } from "../layout/layout.module";
import {SharedModule} from "../shared.module/shared.module";
import {EffectUtilsService} from "../shared/services/effect-utils.service";
import {EmployeeInfoFormComponent} from "./components/employee-info-form/employee-info-form.component";
import {EmployeeListItemComponent} from "./components/employee-list-item/employee-list-item.component";
import {EmployeeStateComponent} from "./components/employee-state/employee-state.component";
import {EmployeeInfoDialogComponent} from "./containers/employee-info-dialog/employee-info-dialog.component";
import { EmployeesFilterComponent } from "./containers/employees-filter/employees-filter.component";
import {EmployeesListPageComponent} from "./containers/employees-list-page/employees-list-page.component";
import {StaffEffects} from "./effects/staff.effects";
import {IState, reducers} from "./reducers";
import {STAFF_FEATURE_NAME} from "./staff.feature-name";
import {StaffRoutingModule} from "./staff.routing.module";

export const STAFF_FEATURE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<IState>>("STAFF Feature Reducers");

@NgModule({
  imports: [
    SharedModule,
    LayoutModule,
    StoreModule.forFeature(STAFF_FEATURE_NAME, STAFF_FEATURE_REDUCER_TOKEN as any),
    EffectsModule.forFeature([StaffEffects]),
    StaffRoutingModule
  ],
  declarations: [
    EmployeeListItemComponent,
    EmployeesListPageComponent,
    EmployeeInfoFormComponent,
    EmployeeInfoDialogComponent,
    EmployeeStateComponent,
    EmployeesFilterComponent,
  ],
  entryComponents: [
    EmployeeInfoDialogComponent
  ],
  providers: [
    {
      provide: STAFF_FEATURE_REDUCER_TOKEN,
      useFactory: reducers
    },
    EmployeesServiceProxy,
    EffectUtilsService
  ]
})
export class StaffModule {
}
