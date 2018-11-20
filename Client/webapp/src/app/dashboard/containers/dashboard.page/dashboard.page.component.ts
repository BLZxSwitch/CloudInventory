import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromDashboard from "../../reducers";

@Component({
  selector: "pr-organizational-units-page",
  templateUrl: "./dashboard.page.component.html",
  styleUrls: ["./dashboard.page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {

  public hasOnlyAdminUsers$ = this.store.pipe(select(fromDashboard.getHasOnlyAdminUsers));

  constructor(private store: Store<fromDashboard.IDashboardState>) {
  }
}
