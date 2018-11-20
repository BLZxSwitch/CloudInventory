import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IOtpGetLinkResponse } from "../../../core/services/service-proxies";
import { OTPActivationRequestAction } from "../../actions/otp.activation-request.action";
import { IOTPActivationFormModel } from "../../components/otp.activation.form/otp.activation.form-model";
import { otpErrorSelector } from "../../selectors/otp-error.selector";
import { otpLinkSelector } from "../../selectors/otp-link.selector";
import { IOtpAuthStore } from "../../store/otp-auth.store";

@Component({
  templateUrl: "./otp.activation.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTPActivationContainer {
  public otpLink$: Observable<IOtpGetLinkResponse>;
  public error$: Observable<string | undefined>;

  constructor(private dialogRef: MatDialogRef<OTPActivationContainer>,
              private store: Store<IOtpAuthStore>) {
    this.otpLink$ = this.store.pipe(otpLinkSelector);
    this.error$ = this.store.pipe(otpErrorSelector);
  }

  public onSubmit(formData: IOTPActivationFormModel) {
    this.store.dispatch(new OTPActivationRequestAction({...formData}));
  }

  public onCancel() {
    this.dialogRef.close();
  }
}
