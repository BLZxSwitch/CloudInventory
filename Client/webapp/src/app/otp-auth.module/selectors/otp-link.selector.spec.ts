import { cold } from "jasmine-marbles";
import { dataMock } from "../../../unit-tests.components/data-mock";
import { IOtpAuthStore } from "../store/otp-auth.store";
import { otpLinkSelector } from "./otp-link.selector";

describe("otp link selector", () => {

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

    const store1 = dataMock<IOtpAuthStore>({
      otpAuth: {
        otpLink: otpLink1
      }
    });

    const store2 = dataMock<IOtpAuthStore>({
      otpAuth: {
        otpLink: otpLink2
      }
    });

    const store$ = cold("ab|", {a: store1, b: store2});

    const actual = store$.pipe(otpLinkSelector);
    expect(actual).toBeObservable(cold("(a|)", {a: otpLink1}));
  });
});
