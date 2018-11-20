import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { RoutesService } from "../../../core/services/routes.service";
import { ISignInRequest } from "../../../core/services/service-proxies";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";
import { PrValidators } from "../../../shared.module/validators/pr-validators";
import { ILoginFormModel } from "./login-form.model";

@Component({
  selector: "pr-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends BasicFormComponent {

  public get createUrl() {
    return this.routesService.companyRegister();
  }

  public get forgotUrl() {
    return this.routesService.authForgotPassword();
  }

  public get captchaGroup(): AbstractControl {
    return this.form.get("recaptchaGroup");
  }

  constructor(private routesService: RoutesService) {
    super();

    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, PrValidators.email]),
      password: new FormControl("", [Validators.required]),
      recaptchaGroup: new FormGroup({
        recaptcha: new FormControl("", [Validators.required]),
      }),
      rememberMe: new FormControl(true),
    });
    this.transformFormData = data => this.getDtoFromForm(data);
  }

  private getDtoFromForm(formValue: ILoginFormModel): ISignInRequest {
    if (!formValue) return undefined;
    return {
      ...formValue,
      validationToken: this.captchaGroup.value.recaptcha
    };
  }
}
