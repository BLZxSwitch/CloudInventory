import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IOrgUnitDTO } from "../../../core/services/service-proxies";
import { OrgUnitDelete, OrgUnitEdit } from "../../actions/org-units.actions";
import { IOrgUnitsStore } from "../../reducers";
import { orgUnitsFilteredEntitiesSelector } from "../../selectors/org-units.filtered-entities.selector";

@Component({
  selector: "pr-org-units-list",
  styles: [`:host {
    display: block;
  }`],
  templateUrl: "./org-units.list.container.html"
})
export class OrgUnitsListContainer {
  public items$: Observable<IOrgUnitDTO[]>;

  constructor(private store: Store<IOrgUnitsStore>) {
     // this.items$ = this.store.pipe(select(getAllOrgUnitsEntities));
     this.items$ = this.store.pipe(orgUnitsFilteredEntitiesSelector);
     console.log(this.items$);
  }

  public trackByFn(index: number, {id}): string {
    return id;
  }

  public onEdit(orgUnit: IOrgUnitDTO): void {
    this.store.dispatch(new OrgUnitEdit({orgUnit}));
  }

  public onDelete(orgUnitId: string) {
    this.store.dispatch(new OrgUnitDelete({orgUnitId}));
  }
}
