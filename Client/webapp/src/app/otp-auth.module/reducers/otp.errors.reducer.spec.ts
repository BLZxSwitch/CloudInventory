import { IOtpActivationRequest } from "../../core/services/service-proxies";
import { OTPActivationFailureAction } from "../actions/otp.activation-request-failure.action";
import { OTPActivationRequestAction } from "../actions/otp.activation-request.action";
import { OTPDiscardChangesAction } from "../actions/otp.discard-changes.action";
import { otpErrorsReducer } from "./otp.errors.reducer";

describe("Errors reducer", () => {

  it("Returns empty string as default value", () => {
    const actual = otpErrorsReducer(undefined, undefined);

    expect(actual).toBeUndefined();
  });

  it("Returns provided value", () => {
    const error = "error";
    const actual = otpErrorsReducer("", new OTPActivationFailureAction(error));

    expect(actual).toEqual(error);
  });

  it("Returns undefined on OTPActivationRequestAction", () => {
    const otpActivationRequest: IOtpActivationRequest = {otp: "otp", otpToken: "otpToken", password: "password"};

    const error = "error";
    const expected = undefined;
    const actual = otpErrorsReducer("", new OTPActivationRequestAction(otpActivationRequest));

    expect(actual).toEqual(expected);
  });

  it("Returns undefined on OTPActivationRequestAction", () => {

    const expected = undefined;
    const actual = otpErrorsReducer("", new OTPDiscardChangesAction());

    expect(actual).toEqual(expected);
  });
});
