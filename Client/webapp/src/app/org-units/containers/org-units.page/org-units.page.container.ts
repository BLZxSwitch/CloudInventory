import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { OrgUnitsLoad } from "../../../data/actions/org-units.collection.actions";
import { OrgUnitAdd } from "../../actions/org-units.actions";
import { IOrgUnitsStore } from "../../reducers";

@Component({
  templateUrl: "./org-units.page.container.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgUnitsPageContainer implements OnInit {

  constructor(private store: Store<IOrgUnitsStore>) {
  }

  public onEntityAdd() {
    this.store.dispatch(new OrgUnitAdd());
  }

  public ngOnInit(): void {
    this.store.dispatch(new OrgUnitsLoad());
  }
}
