import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CompanyRegisterComponent } from "./containers/company-register.component/company-register.component";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: CompanyRegisterComponent,
        path: ""
      }])
  ]
})
export class CompanyRegisterRoutingModule {
}
