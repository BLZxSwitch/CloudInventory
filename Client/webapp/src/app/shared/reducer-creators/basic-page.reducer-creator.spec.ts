import { AuthActionTypes, Login, LoginClean, LoginFailure, LoginSuccess } from "../../auth/actions/auth.actions";
import { SignInRequest, UserDTO } from "../../core/services/service-proxies";
import { createBasicPageReducer, getError, getPending, initialState, IState } from "./basic-page.reducer-creator";

describe("createBasicPageReducer", () => {

  let basicPageReducer;

  beforeEach(() => {
    basicPageReducer = createBasicPageReducer(AuthActionTypes.Login,
      AuthActionTypes.LoginSuccess,
      AuthActionTypes.LoginFailure,
      AuthActionTypes.LoginClean);
  });

  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = basicPageReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("on clear action", () => {
    it("should reset error", () => {
      const action = new LoginClean({});

      const result = basicPageReducer({
        pending: false,
        error: "error",
      }, action);

      expect(result).toEqual({
        pending: false,
        error: undefined,
      });
    });
  });

  describe("on request action", () => {
    it("should set pending no true", () => {
      const action = new Login(new SignInRequest());

      const result = basicPageReducer({
        pending: false,
        error: undefined,
      }, action);

      expect(result).toEqual({
        pending: true,
        error: undefined,
      });
    });
  });

  describe("on success action", () => {
    it("should set pending ", () => {
      const action = new LoginSuccess({user: new UserDTO()});

      const result = basicPageReducer({
        pending: true,
        error: undefined,
      }, action);

      expect(result).toEqual({
        pending: false,
        error: undefined,
      });
    });
  });

  describe("on failure action", () => {
    it("should set pending ", () => {
      const error = "Error";

      const action = new LoginFailure(error);

      const result = basicPageReducer({
        pending: true,
        error: undefined,
      }, action);

      expect(result).toEqual({
        pending: false,
        error,
      });
    });
  });

  describe("getError selector", () => {
    function getErrorCase(error) {
      const state: IState = {
        ...initialState,
        error,
      };
      expect(getError(state)).toEqual(error);
    }

    it("should return correct value when error is set", () => {
      const error = "Error";
      getErrorCase(error);
    });

    it("should return undefined when error is undefined", () => {
      getErrorCase(undefined);
    });
  });

  describe("getPending selector", () => {
    function getPendingCase(pending) {
      const state: IState = {
        ...initialState,
        pending,
      };
      expect(getPending(state)).toEqual(pending);
    }

    it("should return correct value when pending is true", () => {
      getPendingCase(true);
    });

    it("should return undefined when pending is false", () => {
      getPendingCase(false);
    });
  });
});
