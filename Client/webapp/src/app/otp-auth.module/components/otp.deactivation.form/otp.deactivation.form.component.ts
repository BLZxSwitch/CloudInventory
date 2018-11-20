import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MarkAsTouchedService } from "../../../core/services/mark-as-touched.service";
import { DeactivationFormProvider } from "../../services/deactivate.form.provider";
import { IOTPValidatorFormModel } from "../otp.validator.form/otp.validator.form-model";
import { IOTPDeactivationFormModel } from "./otp.deactivation.form-model";

@Component({
  selector: "pr-otp-deactivation",
  templateUrl: "./otp.deactivation.form.component.html",
  styleUrls: ["./otp.deactivation.form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTPDeactivationFormComponent implements OnInit {

  @Output()
  public submitted = new EventEmitter<IOTPDeactivationFormModel>();

  @Output()
  public cancel = new EventEmitter<undefined>();

  public formGroupValidator: FormGroup;

  constructor(private activationFormProvider: DeactivationFormProvider,
              private markAsTouchedService: MarkAsTouchedService) {
  }

  public ngOnInit() {
    this.formGroupValidator = this.activationFormProvider.get();
  }

  public onSubmit() {
    if (this.formGroupValidator.valid) {
      const secondFormValue = this.formGroupValidator.value as IOTPValidatorFormModel;

      const request = {
        otp: secondFormValue.otp,
        password: secondFormValue.password
      };
      this.submitted.emit(request);
    } else {
      this.markAsTouchedService.form(this.formGroupValidator);
    }
  }

  public onCancel() {
    this.cancel.emit();
  }
}
