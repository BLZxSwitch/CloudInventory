import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { RoutesService } from "../../../core/services/routes.service";
import { IForgotPasswordRequest } from "../../../core/services/service-proxies";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";
import { PrValidators } from "../../../shared.module/validators/pr-validators";
import { IFogotPasswordFormModel } from "./forgot-password-form.model";

@Component({
  selector: "pr-forgot-password-form",
  templateUrl: "./forgot-password-form.component.html",
  styleUrls: ["./forgot-password-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordFormComponent extends BasicFormComponent {

  public get authLoginUrl() {
    return this.routesService.authLogin();
  }

  constructor(private formBuilder: FormBuilder,
              private routesService: RoutesService) {
    super();

    this.form = this.formBuilder.group({
      email: ["", [Validators.required, PrValidators.email]],
      recaptchaGroup: this.formBuilder.group({
        recaptcha: ["", [Validators.required]],
      }),
    });
    this.transformFormData = data => this.getDtoFromForm(data);
  }

  public get captchaGroup(): AbstractControl {
    return this.form.get("recaptchaGroup");
  }

  private getDtoFromForm(formValue: IFogotPasswordFormModel): IForgotPasswordRequest {
    if (!formValue) return undefined;
    return {
      ...formValue,
      validationToken: this.captchaGroup.value.recaptcha
    };
  }
}
