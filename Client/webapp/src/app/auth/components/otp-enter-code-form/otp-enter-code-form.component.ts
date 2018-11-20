import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, Validators } from "@angular/forms";
import { MarkAsTouchedService } from "../../../core/services/mark-as-touched.service";
import { IOtpSignInRequest } from "../../../core/services/service-proxies";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";

@Component({
  selector: "pr-otp-enter-code-form",
  templateUrl: "./otp-enter-code-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpEnterCodeFormComponent extends BasicFormComponent {

  @Input()
  public token: any;

  @Output()
  public submitted = new EventEmitter<IOtpSignInRequest>();

  constructor(private formBuilder: FormBuilder,
              private markAsTouchedService: MarkAsTouchedService) {
    super();

    const otpCode = new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);

    this.form = this.formBuilder.group({
      otpCode,
      recaptchaGroup: this.formBuilder.group({
        recaptcha: ["", [Validators.required]],
      }),
    });
  }

  public get captchaGroup(): AbstractControl {
    return this.form.get("recaptchaGroup");
  }

  public onSubmit() {
    if (this.form.valid) {
      const request = {token: this.token.token, code: this.form.value.otpCode, validationToken: this.captchaGroup.value.recaptcha};
      this.submitted.emit(request);
    } else {
      this.markAsTouchedService.form(this.form);
    }
  }
}
