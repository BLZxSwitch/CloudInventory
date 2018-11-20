import { IOtpSignInRequest} from "../../core/services/service-proxies";
import { OtpAuthClean, OtpRedirect } from "../actions/auth.actions";
import { initialState, reducer } from "./otp-auth.reducer";

describe("Otp Auth State Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("LoginSuccess action", () => {
    it("should set email, password and rememberMe on OtpRedirect", () => {
      const token = "token";
      const otpSignInRequest: IOtpSignInRequest = {token, code: undefined, validationToken: undefined};
      const action = new OtpRedirect(otpSignInRequest);

      const result = reducer({
        token
      }, action);

      expect(result).toEqual({
        token,
      });
    });
  });

  describe("OtpAuthClean action", () => {
    it("should set email, password and rememberMe to undefined on OtpAuthClean", () => {
      const token = "token";
      const otpSignInRequest: IOtpSignInRequest = {token, code: undefined, validationToken: undefined};
      const action = new OtpAuthClean(otpSignInRequest);

      const result = reducer({
        token,
      }, action);

      expect(result).toEqual({
        token: undefined,
      });
    });
  });
});
