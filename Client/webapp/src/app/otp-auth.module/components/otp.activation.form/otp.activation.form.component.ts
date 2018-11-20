import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MarkAsTouchedService } from "../../../core/services/mark-as-touched.service";
import { IOtpGetLinkResponse } from "../../../core/services/service-proxies";
import { ActivationFormProvider } from "../../services/activation.form.provider";
import { IOTPValidatorFormModel } from "../otp.validator.form/otp.validator.form-model";
import { IOTPActivationFormModel } from "./otp.activation.form-model";

@Component({
  selector: "pr-otp-activation",
  templateUrl: "./otp.activation.form.component.html",
  styleUrls: ["./otp.activation.form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTPActivationFormComponent implements OnInit {

  @Input()
  public otpLinkResponse: IOtpGetLinkResponse;

  @Input() public errorMessage: string | undefined;

  @Output()
  public submitted = new EventEmitter<IOTPActivationFormModel>();

  @Output()
  public cancel = new EventEmitter<undefined>();

  public formGroupGenerator: FormGroup;
  public formGroupValidator: FormGroup;

  constructor(private activationFormProvider: ActivationFormProvider,
              private markAsTouchedService: MarkAsTouchedService) {
  }

  public ngOnInit() {
    [this.formGroupGenerator, this.formGroupValidator] = this.activationFormProvider.get();
    this.formGroupGenerator.setValue({
      done: false,
      otpLink: this.otpLinkResponse.otpLink,
      secretKey: this.otpLinkResponse.secretKey
    });
  }

  public showErrorsForGenerator() {
    this.markAsTouchedService.form(this.formGroupGenerator);
  }

  public onSubmit() {
    if (this.formGroupValidator.valid) {
      const secondFormValue = this.formGroupValidator.value as IOTPValidatorFormModel;

      const request = {
        otp: secondFormValue.otp,
        password: secondFormValue.password,
        otpToken: this.otpLinkResponse.otpToken
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
