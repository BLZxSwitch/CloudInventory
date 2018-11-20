import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "pr-otp-generator",
  templateUrl: "./otp.generator.form.component.html",
  styleUrls: ["./otp.generator.form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OTPGeneratorFormComponent {
  @Input()
  public formGroup: FormGroup;

  public get otpLink(): string {
    return this.formGroup.value["otpLink"];
  }
  public get secretKey(): string {
    return this.formGroup.value["secretKey"];
  }
}
