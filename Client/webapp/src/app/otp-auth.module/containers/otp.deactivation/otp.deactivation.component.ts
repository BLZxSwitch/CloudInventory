import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import { IOTPDeactivationFormModel } from "../../components/otp.deactivation.form/otp.deactivation.form-model";
import { IOtpAuthStore } from "../../store/otp-auth.store";
import { OTPDeactivationRequestAction } from "./../../actions/otp.deactivation-request.action";

@Component({
  templateUrl: "./otp.deactivation.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTPDeactivationContainer {

  constructor(private dialogRef: MatDialogRef<OTPDeactivationContainer>,
              private store: Store<IOtpAuthStore>) {
  }

  public onSubmit(formData: IOTPDeactivationFormModel) {
    this.store.dispatch(new OTPDeactivationRequestAction({...formData}));
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
