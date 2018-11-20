import { createInjector, get } from "../../../../unit-tests.components/mocks/createInjector";
import { OTPActivationFormComponent } from "./otp.activation.form.component";

describe("OTPEnableComponent", () => {

  beforeEach(() => {
    createInjector(OTPActivationFormComponent);
  });

  it("Should be resolved", () => {
    const actual = get<OTPActivationFormComponent>();
    expect(actual).toEqual(jasmine.any(OTPActivationFormComponent));
  });
});
