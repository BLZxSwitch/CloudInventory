import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { UserSettingsRequest, UserSettingsUpdate } from "../../../auth/actions/user-settings.actions";
import { getUserSettings } from "../../../auth/reducers";
import * as fromAuth from "../../../auth/reducers/index";

@Component({
  templateUrl: "./user-settings.page.component.html",
  styleUrls: ["./user-settings.page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsPageComponent {

  public userSettings$ = this.store.pipe(select(getUserSettings));

  constructor(private store: Store<fromAuth.IState>) {
    this.store.dispatch(new UserSettingsRequest());
  }

  public onSubmit(userSettings) {
    this.store.dispatch(new UserSettingsUpdate({userSettings}));
  }
}
