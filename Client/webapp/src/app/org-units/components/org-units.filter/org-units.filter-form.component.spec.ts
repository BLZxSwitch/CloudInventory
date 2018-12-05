import { FormGroup } from "@angular/forms";
import { cold } from "jasmine-marbles";
import { Mock } from "moq.ts";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { AutoSubmitPipeBehavior } from "../../services/auto-submit.pipe-behavior";
import { OrgUnitsFilterFormProvider } from "../../services/org-units.filter-form.provider";
import { OrgUnitsFilterFormComponent } from "./org-units.filter-form.component";

describe("Org units filter form component", () => {

  beforeEach(() => {
    createInjector(OrgUnitsFilterFormComponent);
  });

  it("Should be resolved", () => {
    const actual = get<OrgUnitsFilterFormComponent>();
    expect(actual).toEqual(jasmine.any(OrgUnitsFilterFormComponent));
  });

  it("Exposes form", () => {
    const formGroup = new Mock<FormGroup>()
      .object();

    resolve<OrgUnitsFilterFormProvider>(OrgUnitsFilterFormProvider)
      .setup(instance => instance.get())
      .returns(formGroup);

    const component = get<OrgUnitsFilterFormComponent>();
    const actual = component.form;

    expect(actual).toBe(formGroup);
  });

  it("Updates the form", () => {
    const filter = "filter";

    const formGroupMock = new Mock<FormGroup>()
      .prototypeof(new FormGroup({}));

    resolve<OrgUnitsFilterFormProvider>(OrgUnitsFilterFormProvider)
      .setup(instance => instance.get())
      .returns(formGroupMock.object());

    const component = get<OrgUnitsFilterFormComponent>();
    component.filter = filter;

    formGroupMock.verify(instance => instance.setValue(Is.Eq({filter})));
  });

  it("Submits the form automatically", () => {
    const filter = "filter";
    const formGroup = new Mock<FormGroup>()
      .setup(instance => instance.valueChanges)
      .returns(cold("-a", {a: {filter}}))
      .object();

    resolve<OrgUnitsFilterFormProvider>(OrgUnitsFilterFormProvider)
      .setup(instance => instance.get())
      .returns(formGroup);

    resolve<AutoSubmitPipeBehavior>(AutoSubmitPipeBehavior)
      .setup(instance => instance.get(OrgUnitsFilterFormComponent.formFilterProjector))
      .returns(value => value);

    const component = get<OrgUnitsFilterFormComponent>();
    component.ngOnInit();

    expect(component.submitted).toBeObservable(cold(`-a`, {a: filter}));
  });
});
