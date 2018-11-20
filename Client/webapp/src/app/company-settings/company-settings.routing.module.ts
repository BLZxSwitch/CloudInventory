import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import { AdminGuard } from "../core/services/admin-guard.service";
import {CompanySettingsPageComponent} from "./containers/company-settings.page/company-settings.page.component";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: CompanySettingsPageComponent,
        path: "",
        canActivate: [AdminGuard],
      }])
  ],
  providers: [
    AdminGuard
  ]
})
export class CompanySettingsRoutingModule {
}
