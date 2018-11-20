import { FormGroup } from "@angular/forms";
import { AbstractControl } from "@angular/forms/src/model";
import { Mock } from "moq.ts";
import { createInjector, get } from "../../../unit-tests.components/mocks/createInjector";
import { MarkAsTouchedService } from "./mark-as-touched.service";

describe("MarkAsTouchedService", () => {

  beforeEach(() => {
    createInjector(MarkAsTouchedService);
  });

  it("Should be resolved", () => {
    const actual = get<MarkAsTouchedService>();
    expect(actual).toEqual(jasmine.any(MarkAsTouchedService));
  });

  it("Marks form controls as touched", () => {
    const controlMock = new Mock<AbstractControl>()
      .setup(instance => instance.markAsTouched())
      .returns(undefined);

    const formGroup = new Mock<FormGroup>()
      .setup(instance => instance.controls)
      .returns({test: controlMock.object()})
      .object();

    const service = get<MarkAsTouchedService>();
    service.form(formGroup);

    controlMock.verify(instance => instance.markAsTouched());
  });
});
