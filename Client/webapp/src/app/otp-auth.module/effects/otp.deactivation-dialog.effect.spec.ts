import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OTPDeactivationSuccessAction } from "../actions/otp.deactivation-request-success.action";
import { OTPDisableFormAction } from "../actions/otp.disable-form.action";
import { OTPDiscardChangesAction } from "../actions/otp.discard-changes.action";
import { OTPDeactivationContainer } from "../containers/otp.deactivation/otp.deactivation.component";
import { OTPDeactivationDialogEffect } from "./otp.deactivation-dialog.effect";

describe("OTPDeactivationDialogEffect", () => {

  beforeEach(() => {
    createInjector(OTPDeactivationDialogEffect);
  });

  it("Should be resolved", () => {
    const actual = get<OTPDeactivationDialogEffect>();
    expect(actual).toEqual(jasmine.any(OTPDeactivationDialogEffect));
  });

  it("Returns observable", () => {
    const expected$ = cold("|");

    resolve<EffectUtilsService>(EffectUtilsService)
      .setup(instance => instance.createOpenDialogEffect(
        Is.Eq([
          OTPDisableFormAction.type]),
        Is.Eq([
          OTPDeactivationSuccessAction.type
        ]),
        OTPDeactivationContainer,
        OTPDiscardChangesAction,
        undefined,
        Is.Eq({
          panelClass: "narrow-padding-container"
        })))
      .returns(expected$);

    const effect = get<OTPDeactivationDialogEffect>();
    expect(effect.effect$()).toBe(expected$);
  });
});
