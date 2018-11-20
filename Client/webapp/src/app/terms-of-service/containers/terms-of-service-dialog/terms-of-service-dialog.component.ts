import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import * as fromStaff from "../../../staff.module/reducers";
import { TermsOfServiceApproveRequest } from "../../actions/terms-of-service.actions";

@Component({
  selector: "pr-terms-of-service-dialog",
  templateUrl: "./terms-of-service-dialog.component.html",
  styleUrls: ["./terms-of-service-dialog.component.scss"]
})
export class TermsOfServiceDialogComponent {

  public toSAccepted: boolean;

  constructor(private dialogRef: MatDialogRef<TermsOfServiceDialogComponent>,
              private store: Store<fromStaff.IState>) {
  }

  public onSubmit() {
    this.store.dispatch(new TermsOfServiceApproveRequest());
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
