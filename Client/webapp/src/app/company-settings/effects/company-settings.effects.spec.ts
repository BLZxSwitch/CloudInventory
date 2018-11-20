import { cold, hot } from "jasmine-marbles";
import { createInjectorWithActions,  TestActions } from "../../../unit-tests.components/mocks/actions";
import { get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { TenantSettingsDTO, TenantSettingsServiceProxy } from "../../core/services/service-proxies";
import {
  CompanySettingsEditFailure,
  CompanySettingsEditRequest,
  CompanySettingsEditSuccess,
  CompanySettingsLoad,
  CompanySettingsLoadFailure,
  CompanySettingsLoadSuccess
} from "../actions/company-settings.actions";
import { CompanySettingsEffects } from "./company-settings.effects";

describe("CompanySettingsEffects", () => {

  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActions(CompanySettingsEffects);
  });

  describe("editTenantSettings$", () => {
    it("should call update and return a CompanySettingsEditSuccess on success", () => {
      const effects = get<CompanySettingsEffects>();
      const tenantSettings = new TenantSettingsDTO();

      const action = new CompanySettingsEditRequest({tenantSettings});
      const completion = new CompanySettingsEditSuccess({tenantSettings});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: tenantSettings});
      const expected = cold("--c", {c: completion});

      resolve<TenantSettingsServiceProxy>(TenantSettingsServiceProxy)
        .setup(instance => instance.update(tenantSettings))
        .returns(response);

      expect(effects.editTenantSettings$).toBeObservable(expected);
    });

    it("should call update and return a CompanySettingsEditFailure on error", () => {
      const effects = get<CompanySettingsEffects>();
      const tenantSettings = new TenantSettingsDTO();
      const error = "Error!";

      const action = new CompanySettingsEditRequest({tenantSettings});
      const completion = new CompanySettingsEditFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<TenantSettingsServiceProxy>(TenantSettingsServiceProxy)
        .setup(instance => instance.update(tenantSettings))
        .returns(response);

      expect(effects.editTenantSettings$).toBeObservable(expected);
    });
  });

  describe("tenantSettingsLoad$", () => {
    it("should call update and return a CompanySettingsLoadSuccess on success", () => {
      const effects = get<CompanySettingsEffects>();
      const tenantSettings = new TenantSettingsDTO();

      const action = new CompanySettingsLoad();
      const completion = new CompanySettingsLoadSuccess({tenantSettings});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: tenantSettings});
      const expected = cold("--c", {c: completion});

      resolve<TenantSettingsServiceProxy>(TenantSettingsServiceProxy)
        .setup(instance => instance.get())
        .returns(response);

      expect(effects.tenantSettingsLoad$).toBeObservable(expected);
    });

    it("should call update and return a CompanySettingsLoadFailure on error", () => {
      const effects = get<CompanySettingsEffects>();
      const error = "Error!";

      const action = new CompanySettingsLoad();
      const completion = new CompanySettingsLoadFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<TenantSettingsServiceProxy>(TenantSettingsServiceProxy)
        .setup(instance => instance.get())
        .returns(response);

      expect(effects.tenantSettingsLoad$).toBeObservable(expected);
    });
  });
});
