import { cold } from "jasmine-marbles";
import { dataMock } from "../../../unit-tests.components/data-mock";
import { IOtpAuthStore } from "../store/otp-auth.store";
import { otpErrorSelector } from "./otp-error.selector";

describe("otp error selector", () => {

  it("returns value", () => {

    const otpLink1 = {
      otpLink: "otpLink1 value",
      otpToken: "otp token",
      secretKey: "secret key",
    };
    const otpLink2 = {
      otpLink: "otpLink2 value",
      otpToken: "otp token",
      secretKey: "secret key",
    };

    const errorOne = "errorOne";

    const errorTwo = "errorOne";

    const store1 = dataMock<IOtpAuthStore>({
      otpAuth: {
        otpLink: otpLink1,
        error: errorOne
      }
    });

    const store2 = dataMock<IOtpAuthStore>({
      otpAuth: {
        otpLink: otpLink2,
        error: errorTwo
      }
    });

    const store$ = cold("ab|", {a: store1, b: store2});

    const actual = store$.pipe(otpErrorSelector);
    expect(actual).toBeObservable(cold("a-|", {a: errorOne}));
  });
});
