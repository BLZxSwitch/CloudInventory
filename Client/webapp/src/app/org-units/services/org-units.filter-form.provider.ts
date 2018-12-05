import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ControlsConfig } from "../../shared/form/controls-config";
import { IOrgUnitsFilterFormModel } from "../components/org-units.filter/org-units.filter-form.model";

@Injectable()
export class OrgUnitsFilterFormProvider {

  constructor(private formBuilder: FormBuilder) {

  }

  public get(): FormGroup {
    const controlsConfig: ControlsConfig<IOrgUnitsFilterFormModel> = {
      filter: [0]
    };

    return this.formBuilder.group(controlsConfig);
  }
}
