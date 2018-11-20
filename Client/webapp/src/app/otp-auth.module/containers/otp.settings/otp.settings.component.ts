import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAuth from "../../../auth/reducers/index";
import { IUserSettingsDTO } from "../../../core/services/service-proxies";
import { OTPDisableFormAction } from "../../actions/otp.disable-form.action";
import { OTPEnableFormAction } from "../../actions/otp.enable-form.action";

@Component({
  selector: "pr-otp-settings",
  templateUrl: "./otp.settings.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTPSettingsComponent {

  @Input()
  public userSettings: IUserSettingsDTO;

  constructor(private store: Store<fromAuth.IState>) {
  }

  public onEnable() {
    this.store.dispatch(new OTPEnableFormAction());
  }

  public onDisable() {
    this.store.dispatch(new OTPDisableFormAction());
  }
}
