import { TenantSettingsDTO } from "../../core/services/service-proxies";
import { CompanySettingsEditSuccess, CompanySettingsLoadSuccess, } from "../actions/company-settings.actions";
import { initialState, reducer } from "./company-settings.reducer";

describe("Company Settings Reducer", () => {
  describe("unknown action", () => {
    it("should return the initial state", () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe("CompanySettingsEditSuccess action", () => {
    it("should set data", () => {
      const tenantSettings = new TenantSettingsDTO({
      });

      const action = new CompanySettingsEditSuccess({tenantSettings});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        tenantSettings,
      });
    });
  });

  describe("CompanySettingsLoadSuccess action", () => {
    it("should set data", () => {
      const tenantSettings = new TenantSettingsDTO({
      });

      const action = new CompanySettingsLoadSuccess({tenantSettings});

      const result = reducer(initialState, action);

      expect(result).toEqual({
        tenantSettings,
      });
    });
  });
});
