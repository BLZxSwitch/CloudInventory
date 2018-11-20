import {
  ChangeDetectionStrategy,
  Component
} from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../../reducers/index";
import { ReloadApplicationAction } from "../../actions/update-application.actions";

@Component({
  selector: "pr-update-notification",
  templateUrl: "./update-notification.component.html",
  styleUrls: [
    "./update-notification.component.scss"
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateNotificationComponent {
  constructor(
    private snackBar: MatSnackBar,
    private store: Store<fromRoot.IState>) {
  }

  public onUpdate() {
    this.store.dispatch(new ReloadApplicationAction());
    this.snackBar.dismiss();
  }

  public onClose() {
    this.snackBar.dismiss();
  }
}
