import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { OtpRequestErrorAction } from "../../core/actions/otp-request-error.action";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OTPActivationSuccessAction } from "../actions/otp.activation-request-success.action";
import { OTPDiscardChangesAction } from "../actions/otp.discard-changes.action";
import { OTPGetLinkSuccessAction } from "../actions/otp.get-link-success.action";
import { OTPActivationContainer } from "../containers/otp.activation/otp.activation.component";
import { OTPActivationDialogEffect } from "./otp.activation-dialog.effect";

describe("OTPActivationDialogEffect", () => {

  beforeEach(() => {
    createInjector(OTPActivationDialogEffect);
  });

  it("Should be resolved", () => {
    const actual = get<OTPActivationDialogEffect>();
    expect(actual).toEqual(jasmine.any(OTPActivationDialogEffect));
  });

  it("Returns observable", () => {
    const expected$ = cold("|");

    resolve<EffectUtilsService>(EffectUtilsService)
      .setup(instance => instance.createOpenDialogEffect(
        Is.Eq([
          OTPGetLinkSuccessAction.type]),
        Is.Eq([
          OTPActivationSuccessAction.type,
          OtpRequestErrorAction.type
        ]),
        OTPActivationContainer,
        OTPDiscardChangesAction,
        undefined,
        Is.Eq({
          panelClass: "narrow-padding-container"
        })))
      .returns(expected$);

    const effect = get<OTPActivationDialogEffect>();
    expect(effect.effect$()).toBe(expected$);
  });
});
