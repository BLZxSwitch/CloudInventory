import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { UnspecifiedBadRequestError } from "../../core/errors/unspecified-bad-request.error";
import {
  AuthOtpServiceProxy,
  OtpActivationRequest,
  UserSettingsDTO
} from "../../core/services/service-proxies";
import { OTPActivationFailureAction } from "../actions/otp.activation-request-failure.action";
import { OTPActivationSuccessAction } from "../actions/otp.activation-request-success.action";
import { OTPActivationRequestAction } from "../actions/otp.activation-request.action";
import { OTPActivationRequestEffect } from "./otp.activation-request.effect";

describe("OTPActivationRequestEffect", () => {

  beforeEach(() => {
    createInjector(OTPActivationRequestEffect);
  });

  it("Should be resolved", () => {
    const actual = get<OTPActivationRequestEffect>();
    expect(actual).toEqual(jasmine.any(OTPActivationRequestEffect));
  });

  it("Returns success action", () => {
    const otpActivationData = {
      otp: "otp",
      password: "password",
      otpToken: "otp token"
    };
    const otpActivationRequest = OtpActivationRequest.fromJS(otpActivationData);

    const action = new OTPActivationRequestAction(otpActivationRequest);
    const actions$ = cold("a|", {a: action});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<AuthOtpServiceProxy>(AuthOtpServiceProxy)
      .setup(instance => instance.activate(Is.Eq(otpActivationRequest)))
      .returns(cold("-a", {a: UserSettingsDTO.fromJS({})}));

    const effects = get<OTPActivationRequestEffect>();

    const userSettings = UserSettingsDTO.fromJS({});
    const expected = new OTPActivationSuccessAction({userSettings});
    expect(effects.effect$()).toBeObservable(cold("-a", {a: expected}));
  });

  it("Returns failure action", () => {
    const otpActivationData = {
      otp: "otp",
      password: "password",
      otpToken: "otp token"
    };
    const otpActivationRequest = OtpActivationRequest.fromJS(otpActivationData);
    const badRequestError = new UnspecifiedBadRequestError();

    const action = new OTPActivationRequestAction(otpActivationRequest);
    const actions$ = cold("a", {a: action});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<AuthOtpServiceProxy>(AuthOtpServiceProxy)
      .setup(instance => instance.activate(Is.Eq(otpActivationRequest)))
      .returns(cold("-#", undefined, badRequestError));

    const effects = get<OTPActivationRequestEffect>();

    const expected = new OTPActivationFailureAction(badRequestError);
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

    const effect = get<OTPActivationRequestEffect>();

    expect(effect.effect$()).toBeObservable(cold(""));
  });
});
