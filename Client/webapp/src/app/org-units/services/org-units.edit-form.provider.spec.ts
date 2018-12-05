import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Mock } from "moq.ts";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { ControlsConfig } from "../../shared/form/controls-config";
import { IOrgUnitFormModel } from "../components/org-unit-form/org-unit-form-model";
import { OrgUnitsEditFormProvider } from "./org-units.edit-form.provider";

describe("OrgUnitEditFormProvider", () => {

  beforeEach(() => {
    createInjector(OrgUnitsEditFormProvider);
  });

  it("Should be resolved", () => {
    const actual = get<OrgUnitsEditFormProvider>();
    expect(actual).toEqual(jasmine.any(OrgUnitsEditFormProvider));
  });

  it("Returns form", () => {
    const formGroup = new Mock<FormGroup>()
      .object();

    const formConfig: ControlsConfig<IOrgUnitFormModel> = {
      name: ["", [Validators.required]],
      currentOrgUnitMOLId: ["", [Validators.required]],
    };

    resolve<FormBuilder>(FormBuilder)
      .setup(instance => instance.group(Is.Eq(formConfig)))
      .returns(formGroup);

    const component = get<OrgUnitsEditFormProvider>();
    const actual = component.get();

    expect(actual).toBe(formGroup);
  });
});
