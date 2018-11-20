import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { UnspecifiedBadRequestError } from "../../core/errors/unspecified-bad-request.error";
import {
  AuthOtpServiceProxy,
  OtpGetLinkResponse
} from "../../core/services/service-proxies";
import { OTPEnableFormAction } from "../actions/otp.enable-form.action";
import { OTPGetLinkFailureAction } from "../actions/otp.get-link-failure.action";
import { OTPGetLinkSuccessAction } from "../actions/otp.get-link-success.action";
import { OTPGetOtpLinkEffect } from "./otp.get-opt-link.effect";

describe("OTPGetOtpLinkEffect", () => {

  beforeEach(() => {
    createInjector(OTPGetOtpLinkEffect);
  });

  it("Should be resolved", () => {
    const actual = get<OTPGetOtpLinkEffect>();
    expect(actual).toEqual(jasmine.any(OTPGetOtpLinkEffect));
  });

  it("Returns success action", () => {
    const otpLinkResponse = {
      otp: "otp"
    };

    const action = new OTPEnableFormAction();
    const actions$ = cold("a|", {a: action});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<AuthOtpServiceProxy>(AuthOtpServiceProxy)
      .setup(instance => instance.get())
      .returns(cold("-a", {a: OtpGetLinkResponse.fromJS(otpLinkResponse)}));

    const effects = get<OTPGetOtpLinkEffect>();

    const expected = new OTPGetLinkSuccessAction(
      OtpGetLinkResponse.fromJS(otpLinkResponse)
    );
    expect(effects.effect$()).toBeObservable(cold("-a", {a: expected}));
  });

  it("Returns failure action", () => {

    const badRequestError = new UnspecifiedBadRequestError();

    const action = new OTPEnableFormAction();
    const actions$ = cold("a", {a: action});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<AuthOtpServiceProxy>(AuthOtpServiceProxy)
      .setup(instance => instance.get())
      .returns(cold("-#", undefined, badRequestError));

    const effects = get<OTPGetOtpLinkEffect>();

    const expected = new OTPGetLinkFailureAction(badRequestError);
    expect(effects.effect$()).toBeObservable(cold("-a", {a: expected}));
  });

  it("Ignores other actions", () => {
    class TestAction implements Action {
      public type: string;
    }

    const testAction = new TestAction();

    const actions$ = cold("a", {a: testAction});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    const effect = get<OTPGetOtpLinkEffect>();

    expect(effect.effect$()).toBeObservable(cold(""));
  });
});
