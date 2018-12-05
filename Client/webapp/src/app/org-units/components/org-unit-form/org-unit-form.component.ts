import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IOrgUnitDTO } from "../../../core/services/service-proxies";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";
import { OrgUnitsEditFormProvider } from "../../services/org-units.edit-form.provider";
import { IOrgUnitFormModel } from "./org-unit-form-model";

@Component({
  selector: "pr-org-unit-edit",
  templateUrl: "./org-unit-form.component.html",
  styleUrls: ["./org-unit-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrgUnitFormComponent extends BasicFormComponent {
  @Input() public type: string;

  @Input()
  public set orgUnit(orgUnit: IOrgUnitDTO) {
    if (orgUnit === undefined) return;

    this._edited = orgUnit;
    const value: IOrgUnitFormModel = {
      name: orgUnit.name,
      currentOrgUnitMOLId: orgUnit.currentOrgUnitMOLId,
      // isActive: orgUnit.isActive,
    };
    this.form.setValue(value);
  }

  public form: FormGroup;

  private _edited: IOrgUnitDTO;

  constructor(private formProvider: OrgUnitsEditFormProvider) {
    super();
    this.form = formProvider.get();
    this.transformFormData = data => this.getDtoFromForm(data);
  }

  public getDtoFromForm(data) {
      const model: IOrgUnitDTO = {
        ...this._edited,
        // isActive: data.isActive,
        name: data.name,
        currentOrgUnitMOLId: data.currentOrgUnitMOLId,
      };

      return model;
  }
}
