import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { UnspecifiedBadRequestError } from "../../core/errors/unspecified-bad-request.error";
import {
  AuthOtpServiceProxy,
  OtpDeactivationRequest,
  UserSettingsDTO
} from "../../core/services/service-proxies";
import { OTPDeactivationFailureAction } from "../actions/otp.deactivation-request-failure.action";
import { OTPDeactivationSuccessAction } from "../actions/otp.deactivation-request-success.action";
import { OTPDeactivationRequestAction } from "../actions/otp.deactivation-request.action";
import { OTPDeactivationRequestEffect } from "./otp.deactivation-request.effect";

describe("OTPDeactivationRequestEffect", () => {

  beforeEach(() => {
    createInjector(OTPDeactivationRequestEffect);
  });

  it("Should be resolved", () => {
    const actual = get<OTPDeactivationRequestEffect>();
    expect(actual).toEqual(jasmine.any(OTPDeactivationRequestEffect));
  });

  it("Returns success action", () => {
    const otpDeactivationData = {
      otp: "otp",
      password: "password"
    };
    const otpDeactivationRequest = OtpDeactivationRequest.fromJS(otpDeactivationData);

    const action = new OTPDeactivationRequestAction(otpDeactivationRequest);
    const actions$ = cold("a|", {a: action});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<AuthOtpServiceProxy>(AuthOtpServiceProxy)
      .setup(instance => instance.deactivate(Is.Eq(otpDeactivationRequest)))
      .returns(cold("-a", {a: UserSettingsDTO.fromJS({})}));

    const effects = get<OTPDeactivationRequestEffect>();

    const userSettings = UserSettingsDTO.fromJS({});
    const expected = new OTPDeactivationSuccessAction({userSettings});
    expect(effects.effect$()).toBeObservable(cold("-a", {a: expected}));
  });

  it("Returns failure action", () => {
    const otpDeactivationData = {
      otp: "otp",
      password: "password"
    };
    const otpDeactivationRequest = OtpDeactivationRequest.fromJS(otpDeactivationData);
    const badRequestError = new UnspecifiedBadRequestError();

    const action = new OTPDeactivationRequestAction(otpDeactivationRequest);
    const actions$ = cold("a", {a: action});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<AuthOtpServiceProxy>(AuthOtpServiceProxy)
      .setup(instance => instance.deactivate(Is.Eq(otpDeactivationRequest)))
      .returns(cold("-#", undefined, badRequestError));

    const effects = get<OTPDeactivationRequestEffect>();

    const expected = new OTPDeactivationFailureAction(badRequestError);
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

    const effect = get<OTPDeactivationRequestEffect>();

    expect(effect.effect$()).toBeObservable(cold(""));
  });
});
