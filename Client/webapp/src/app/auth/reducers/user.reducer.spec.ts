import { UserDTO, UserSettingsDTO } from "../../core/services/service-proxies";
import { LoginSuccess, MeRequestSuccess } from "../actions/auth.actions";
import { initialState, reducer } from "./user.reducer";

describe("User Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("LoginSuccess action", () => {
    it("should set data", () => {
      const email = "email";
      const fullName = "fullName";
      const employeeId = "employeeId";
      const isCompanyAdministrator = true;

      const user = new UserDTO({
        email,
        fullName,
        employeeId,
        isCompanyAdministrator,
        roles: [],
        userSettings: new UserSettingsDTO()
      });

      const action = new LoginSuccess({user});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        email,
        employeeId,
        isCompanyAdministrator,
        fullName
      });
    });
  });

  describe("MeRequestSuccess action", () => {
    it("should set data", () => {
      const email = "email";
      const fullName = "fullName";
      const employeeId = "employeeId";
      const isCompanyAdministrator = true;

      const user = new UserDTO({
        email,
        fullName,
        employeeId,
        isCompanyAdministrator,
        roles: [],
        userSettings: new UserSettingsDTO(),
      });

      const action = new MeRequestSuccess({user});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        email,
        employeeId,
        isCompanyAdministrator,
        fullName
      });
    });
  });
});
