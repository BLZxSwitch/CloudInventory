import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ControlsConfig } from "../../shared/form/controls-config";
import { IOTPGeneratorFormModel } from "../components/otp.generator.form/otp.generator.form-model";
import { IOTPValidatorFormModel } from "../components/otp.validator.form/otp.validator.form-model";

@Injectable()
export class ActivationFormProvider {

  constructor(private formBuilder: FormBuilder) {
  }

  public get() {

    const firstFormGroup: ControlsConfig<IOTPGeneratorFormModel> = {
      done: [false, [Validators.requiredTrue]],
      otpLink: [""],
      secretKey: [""]
    };

    const secondFormGroup: ControlsConfig<IOTPValidatorFormModel> = {
      otp: ["", [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      password: ["", [Validators.required]]
    };

    return [
      this.formBuilder.group(firstFormGroup),
      this.formBuilder.group(secondFormGroup)
    ];
  }
}
