import { UserDTO, UserSettingsDTO } from "../../core/services/service-proxies";
import { LoginSuccess, MeRequestSuccess } from "../actions/auth.actions";
import { UserSettingsRequestSuccess, UserSettingsUpdateSuccess } from "../actions/user-settings.actions";
import { initialState, reducer } from "./user-settings.reducer";

describe("User Settings Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("LoginSuccess action", () => {
    it("should set isTwoFactorAuthenticationEnabled and language", () => {
      const user = new UserDTO();
      const isTwoFactorAuthenticationEnabled = true;
      const language = "language";
      // const hasUserPicture = true;
      user.userSettings = new UserSettingsDTO({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      });

      const action = new LoginSuccess({user});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture
      });
    });
  });

  describe("MeRequestSuccess action", () => {
    it("should set isTwoFactorAuthenticationEnabled and language", () => {
      const user = new UserDTO();
      const isTwoFactorAuthenticationEnabled = true;
      const language = "language";
      // const hasUserPicture = true;
      user.userSettings = new UserSettingsDTO({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      });

      const action = new MeRequestSuccess({user});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      });
    });
  });

  describe("UserSettingsUpdateSuccess action", () => {
    it("should set isTwoFactorAuthenticationEnabled and language", () => {
      const isTwoFactorAuthenticationEnabled = true;
      const language = "language";
      // const hasUserPicture = true;
      const userSettings = new UserSettingsDTO({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      });

      const action = new UserSettingsUpdateSuccess({userSettings});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      });
    });
  });

  describe("UserSettingsRequestSuccess action", () => {
    it("should set user settings", () => {
      const isTwoFactorAuthenticationEnabled = true;
      const language = "language";
      // const hasUserPicture = true;
      const userSettings = new UserSettingsDTO({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      });

      const action = new UserSettingsRequestSuccess({userSettings});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      });
    });
  });
});
