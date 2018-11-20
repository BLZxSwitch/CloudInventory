import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";

@Component({
  selector: "pr-reset-password-form",
  templateUrl: "./reset-password-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent extends BasicFormComponent {

  constructor(private formBuilder: FormBuilder) {
    super();

    const password = new FormControl("", Validators.required);
    const confirmPassword = new FormControl("", CustomValidators.equalTo(password));

    this.form = this.formBuilder.group({
      password,
      confirmPassword
    });
  }
}
