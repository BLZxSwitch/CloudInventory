import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "pr-otp-validator",
  templateUrl: "./otp.validator.form.component.html",
  styleUrls: ["./otp.validator.form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTPValidatorFormComponent {
  @Input()
  public formGroup: FormGroup;
  public mask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/];

}
