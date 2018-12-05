import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { filter } from "rxjs/operators";
import { OrgUnitsFilterChanged } from "../../actions/org-units-filter.actions";
import { getOrgUnitFilterName, IOrgUnitsStore } from "../../reducers";

@Component({
  selector: "pr-org-units-filter",
  styles: [`:host {
    display: block;
  }`],
  templateUrl: "./org-units.filter.container.html"
})
export class OrgUnitsFilterContainer {
  public filter$ = this.store.pipe(select(getOrgUnitFilterName), filter(value => value !== undefined));

  constructor(
    private store: Store<IOrgUnitsStore>) {
  }

  public onChange(name: string) {
    this.store.dispatch(new OrgUnitsFilterChanged({name}));
  }
}
