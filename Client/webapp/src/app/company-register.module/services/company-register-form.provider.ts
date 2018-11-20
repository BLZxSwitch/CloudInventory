import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { CompanyNameNotTakenValidator } from "../../core/validators/company-name-not-taken.validator";
import { EmailNotTakenValidator } from "../../core/validators/email-not-taken.validator";
import { PrValidators } from "../../shared.module/validators/pr-validators";
import { ControlsConfig } from "../../shared/form/controls-config";
import {
  ICompanyRegisterFirstFormModel,
  ICompanyRegisterSecondFormModel,
  ICompanyRegisterThirdFormModel
} from "../components/company-register.form.component/company-register.form.model";

@Injectable({
  providedIn: "root"
})
export class CompanyRegisterFormProvider {

  constructor(
    private formBuilder: FormBuilder,
    private companyNameNotTakenValidator: CompanyNameNotTakenValidator,
    private emailNotTakenValidator: EmailNotTakenValidator) {
  }

  public get() {
    const companyNameNotTakenValidator = this.companyNameNotTakenValidator.create();
    const emailNotTakenValidator = this.emailNotTakenValidator.create();

    const firstFormGroup: ControlsConfig<ICompanyRegisterFirstFormModel> = {
      companyName: ["", [Validators.required], [companyNameNotTakenValidator]],
      companyPhone: ["", [Validators.required]],
      address: [""],
      zip: [""],
      city: [""],
    };

    const password = new FormControl("", Validators.required);
    const confirmPassword = new FormControl("", CustomValidators.equalTo(password));

    const secondFormGroup: ControlsConfig<ICompanyRegisterSecondFormModel> = {
      gender: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      patronymicName: ["", [Validators.required]],
      email: ["", [Validators.required, PrValidators.email], [emailNotTakenValidator]],
      password,
      confirmPassword,
      dateOfBirth: ["", [Validators.required]]
    };

    const thirdFormGroup: ControlsConfig<ICompanyRegisterThirdFormModel> = {
      toSAccepted: [false, [Validators.requiredTrue]],
      recaptchaGroup: this.formBuilder.group({
        recaptcha: ["", [Validators.required]],
      }),
    };

    return [
      this.formBuilder.group(firstFormGroup),
      this.formBuilder.group(secondFormGroup),
      this.formBuilder.group(thirdFormGroup)
    ];
  }
}
