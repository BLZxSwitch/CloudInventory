import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ControlsConfig } from "../../shared/form/controls-config";
import { IOrgUnitFormModel } from "../components/org-unit-form/org-unit-form-model";

@Injectable()
export class OrgUnitsEditFormProvider {

  constructor(private formBuilder: FormBuilder) {

  }

  public get(): FormGroup {
    const controlsConfig: ControlsConfig<IOrgUnitFormModel> = {
      name: ["", [Validators.required]],
      currentOrgUnitMOLId: ["", [Validators.required]],
      // isActive: [true, [Validators.required]]
    };

    return this.formBuilder.group(controlsConfig);
  }
}
