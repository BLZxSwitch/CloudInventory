import { OTPGetLinkSuccessAction } from "../actions/otp.get-link-success.action";
import { otpLinkReducer } from "./otp.otp-link.reducer";

describe("Otp link reducer", () => {

  it("Returns empty string as default value", () => {
    const actual = otpLinkReducer(undefined, undefined);

    expect(actual).toBeUndefined();
  });

  it("Returns provided value", () => {
    const otpLink = {
      otpLink: "otp link",
      otpToken: "otp token",
      secretKey: "secret key",
    };
    const actual = otpLinkReducer("old value", new OTPGetLinkSuccessAction(otpLink));

    expect(actual).toEqual(otpLink);
  });

  it("Returns current state when action is not OTPGetLinkSuccessAction", () => {
    const state = {
      otpLink: "old value",
      otpToken: "",
      secretKey: "",
    };
    const actual = otpLinkReducer(state, undefined);

    expect(actual).toEqual(state);
  });

});
