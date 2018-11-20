import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { UserPictureServiceProxy, UserSettingsServiceProxy } from "../core/services/service-proxies";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../shared.module/shared.module";
import { OTPAuthModule } from "./../otp-auth.module/otp-auth.module";
import { UserPictureCropperComponent } from "./components/user-picture-cropper/user-picture-cropper.component";
import { UserSettingsFormComponent } from "./components/user-settings-form/user-settings-form.component";
import { UserPictureEditorComponent } from "./containers/user-picture-editor/user-picture-editor.component";
import { UserSettingsPageComponent } from "./containers/user-settings.page/user-settings.page.component";
import { UserSettingsEffects } from "./effects/user-settings.effects";
import { UserSettingsRoutingModule } from "./user-settings.routing.module";

@NgModule({
  declarations: [
    UserSettingsPageComponent,
    UserSettingsFormComponent,
    UserPictureEditorComponent,
    UserPictureCropperComponent,
  ],
  imports: [
    SharedModule,
    LayoutModule,
    UserSettingsRoutingModule,
    OTPAuthModule,
    EffectsModule.forFeature([UserSettingsEffects])
  ],
  entryComponents: [
    UserPictureCropperComponent,
    UserSettingsPageComponent
  ],
  providers: [
    UserSettingsServiceProxy,
    UserPictureServiceProxy,
  ]
})
export class UserSettingsModule {
}
