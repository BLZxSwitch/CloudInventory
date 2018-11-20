import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { SharedModule } from "../shared.module/shared.module";
import {
  UpdateNotificationComponent
} from "./components/update-notification/update-notification.component";
import { UpdateAvailableNotificationEffects } from "./effects/update-available-notifications.effect";
import { UpdateApplicationSnackBarService } from "./services/update-application-snack-bar.service";

@NgModule({
  imports: [
    SharedModule,
    EffectsModule.forFeature(
      [
        UpdateAvailableNotificationEffects
      ]),
  ],
  declarations: [
    UpdateNotificationComponent,
  ],
  providers: [
    UpdateApplicationSnackBarService
  ],
  entryComponents: [
    UpdateNotificationComponent
  ]
})
export class UpdateApplicationModule {
}
