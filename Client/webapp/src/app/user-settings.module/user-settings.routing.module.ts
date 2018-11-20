import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {UserSettingsPageComponent} from "./containers/user-settings.page/user-settings.page.component";

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild([
      {
        component: UserSettingsPageComponent,
        path: "",
      }])
  ],
})
export class UserSettingsRoutingModule {
}
