import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DashboardPageComponent } from "./containers/dashboard.page/dashboard.page.component";
import { DashboardGuard } from "./services/dashboard.guard";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: DashboardPageComponent,
        path: "",
        canActivate: [DashboardGuard],
      }])
  ],
  providers: [DashboardGuard],
})
export class DashboardRoutingModule {
}
