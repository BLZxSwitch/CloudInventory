import { UserDTO } from "../../core/services/service-proxies";
import { LoginSuccess, Logout, MeRequestSuccess } from "../actions/auth.actions";
import { initialState, reducer } from "./auth-status.reducer";

describe("Auth State Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("LoginSuccess action", () => {
    it("should set loggedIn to true and  user value", () => {
      const user = new UserDTO();
      const action = new LoginSuccess({user});

      const result = reducer({
        loggedIn: false,
      }, action);

      expect(result).toEqual({
        loggedIn: true,
      });
    });
  });

  describe("MeRequestSuccess action", () => {
    it("should set loggedIn to true and  user value", () => {
      const user = new UserDTO();
      const action = new MeRequestSuccess({user});

      const result = reducer({
        loggedIn: false,
      }, action);

      expect(result).toEqual({
        loggedIn: true,
      });
    });
  });

  describe("Logout action", () => {
    it("should set loggedIn to true and user value", () => {
      const action = new Logout();

      const result = reducer({
        loggedIn: true,
      }, action);

      expect(result).toEqual({
        loggedIn: false,
      });
    });
  });
});
