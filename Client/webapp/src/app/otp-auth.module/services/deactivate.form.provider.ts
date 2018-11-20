import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ControlsConfig } from "../../shared/form/controls-config";
import { IOTPValidatorFormModel } from "../components/otp.validator.form/otp.validator.form-model";

@Injectable()
export class DeactivationFormProvider {

  constructor(private formBuilder: FormBuilder) {
  }

  public get() {

    const formGroup: ControlsConfig<IOTPValidatorFormModel> = {
      otp: ["", [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      password: ["", [Validators.required]]
    };

    return this.formBuilder.group(formGroup);
  }
}
