import { FormBuilder, FormGroup } from "@angular/forms";
import { Mock } from "moq.ts";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { ControlsConfig } from "../../shared/form/controls-config";
import { IOrgUnitsFilterFormModel } from "../components/org-units.filter/org-units.filter-form.model";
import { OrgUnitsFilterFormProvider } from "./org-units.filter-form.provider";

describe("Org units filter form provider", () => {

  beforeEach(() => {
    createInjector(OrgUnitsFilterFormProvider);
  });

  it("Should be resolved", () => {
    const actual = get<OrgUnitsFilterFormProvider>();
    expect(actual).toEqual(jasmine.any(OrgUnitsFilterFormProvider));
  });

  it("Returns form", () => {
    const formGroup = new Mock<FormGroup>()
      .object();

    const formConfig: ControlsConfig<IOrgUnitsFilterFormModel> = {
      filter: [0]
    };

    resolve<FormBuilder>(FormBuilder)
      .setup(instance => instance.group(Is.Eq(formConfig)))
      .returns(formGroup);

    const component = get<OrgUnitsFilterFormProvider>();
    const actual = component.get();

    expect(actual).toBe(formGroup);
  });
});
