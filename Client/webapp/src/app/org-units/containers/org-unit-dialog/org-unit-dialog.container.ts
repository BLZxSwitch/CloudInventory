import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { IOrgUnitDTO } from "../../../core/services/service-proxies";
import { OrgUnitSubmit } from "../../actions/org-units.actions";
import * as fromOrgUnits from "../../reducers/index";

@Component({
  selector: "pr-org-unit-dialog",
  templateUrl: "./org-unit-dialog.container.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgUnitDialogContainer {
  public orgUnit$ = this.store.pipe(select(fromOrgUnits.getEditingOrgUnit));

  public type$ = this.orgUnit$.pipe(map(orgUnit => orgUnit
    ? "edit"
    : "add"));

  constructor(private dialogRef: MatDialogRef<OrgUnitDialogContainer>,
              private store: Store<fromOrgUnits.IOrgUnitsStore>) {
  }

  public onSubmit(orgUnit: IOrgUnitDTO) {
    this.store.dispatch(new OrgUnitSubmit({orgUnit}));
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
