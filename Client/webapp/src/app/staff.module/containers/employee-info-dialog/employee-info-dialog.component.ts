import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { select, Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { EmployeeDTO } from "../../../core/services/service-proxies";
import { EmployeeSendInvitation, EmployeeSubmit } from "../../actions/staff.actions";
import * as fromStaff from "../../reducers";

@Component({
  selector: "pr-employee-info-dialog",
  templateUrl: "./employee-info-dialog.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeInfoDialogComponent {

  public employee$ = this.store.pipe(select(fromStaff.getEditingEmployee));

  public type$ = this.employee$.pipe(map(employee => employee
    ? "edit"
    : "add"));

  public sendInvite = false;

  public pending$ = this.store.pipe(select(fromStaff.getEmployeeInfoDialogPendingState));

  constructor(private dialogRef: MatDialogRef<EmployeeInfoDialogComponent>,
              private store: Store<fromStaff.IState>) {
  }

  public onSubmit(data: EmployeeDTO) {
    this.store.dispatch(new EmployeeSubmit({employee: data, invite: this.sendInvite}));
  }

  public onSendInvitation(data: EmployeeDTO) {
     this.store.dispatch(new EmployeeSendInvitation(({employee: data})));
  }

  public onSetInvitationFlag(invitationFlag: boolean) {
    this.sendInvite = invitationFlag;
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
