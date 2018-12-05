import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminGuard } from "../core/services/admin-guard.service";
import { NEW } from "../core/services/routes.service";
import { OrgUnitAddRequest } from "../data/actions/org-units.collection.actions";
import { OrgUnitsPageContainer } from "./containers/org-units.page/org-units.page.container";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: OrgUnitsPageContainer,
        path: "",
        canActivate: [AdminGuard],
      },
      {
        component: OrgUnitsPageContainer,
        path: NEW,
        data: {addEntityAction: OrgUnitAddRequest},
        canActivate: [AdminGuard],
      },
    ])
  ],
  providers: [
    AdminGuard,
  ],
})
export class OrgUnitsRoutingModule {
}
