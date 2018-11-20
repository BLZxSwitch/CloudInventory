import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TenantSettingsDTO } from "../../../core/services/service-proxies";
import { BasicFormComponent } from "../../../shared.module/base-components/basic-form-component";
import { PrValidators } from "../../../shared.module/validators/pr-validators";

@Component({
  selector: "pr-company-settings-form",
  templateUrl: "./company-settings-form.component.html",
  styleUrls: ["./company-settings-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySettingsFormComponent extends BasicFormComponent {

  get companySettings(): TenantSettingsDTO {
    return this._companySettings;
  }

  @Input() set companySettings(value: TenantSettingsDTO) {
    this._companySettings = value || new TenantSettingsDTO();
    const model = this.getFormFromDto(this.companySettings);
    this.form.patchValue(model);
  }

  private _companySettings: TenantSettingsDTO;

  constructor(private formBuilder: FormBuilder) {
    super();
    this.createForm();

    this.transformFormData = data => this.getDtoFromForm(data);
  }

  private createForm(): void {

    const controlsConfig = {

    };

    this.form = this.formBuilder.group(controlsConfig);
  }

  private getFormFromDto(value: TenantSettingsDTO) {
    return {
    };
  }

  private getDtoFromForm(formValue): TenantSettingsDTO {
    if (!formValue) return undefined;

    return new TenantSettingsDTO({
      ...this.companySettings
    });
  }
}
