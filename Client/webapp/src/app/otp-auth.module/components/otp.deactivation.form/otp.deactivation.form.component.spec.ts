import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { OTPDeactivationFormComponent } from "./otp.deactivation.form.component";

describe("OTPDeactivationFormComponent", () => {

  beforeEach(() => {
    createInjector(OTPDeactivationFormComponent);
  });

  it("Should be resolved", () => {
    const actual = get<OTPDeactivationFormComponent>();
    expect(actual).toEqual(jasmine.any(OTPDeactivationFormComponent));
  });
});
