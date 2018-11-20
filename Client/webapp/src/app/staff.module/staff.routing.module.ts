import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminGuard } from "../core/services/admin-guard.service";
import { NEW } from "../core/services/routes.service";
import { EmployeeAdd } from "./actions/staff.actions";
import { EmployeesListPageComponent } from "./containers/employees-list-page/employees-list-page.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: EmployeesListPageComponent,
        canActivate: [AdminGuard]
      },
      {
        path: NEW,
        component: EmployeesListPageComponent,
        data: {addEntityAction: EmployeeAdd},
        canActivate: [AdminGuard]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
    AdminGuard
  ]
})
export class StaffRoutingModule {
}
