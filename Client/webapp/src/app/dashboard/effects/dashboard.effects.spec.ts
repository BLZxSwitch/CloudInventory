import { cold, hot } from "jasmine-marbles";
import { createInjectorWithActions, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { DashboardServiceProxy, DashboardSummaryResponse } from "../../core/services/service-proxies";
import { DashboardSummaryFailure, DashboardSummaryRequest, DashboardSummarySuccess } from "../actions/dashboard.actions";
import { DashboardEffects } from "./dashboard.effects";

describe("DashboardEffects", () => {

  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActions(DashboardEffects);
  });

  describe("loadSummary$", () => {
    it("should return a DashboardSummarySuccess on success", () => {

      const effects = get<DashboardEffects>();
      const dashboardSummaryResponse = new DashboardSummaryResponse();

      const action = new DashboardSummaryRequest();
      const completion = new DashboardSummarySuccess({dashboardSummaryResponse});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: dashboardSummaryResponse});
      const expected = cold("--c", {c: completion});

      resolve<DashboardServiceProxy>(DashboardServiceProxy)
        .setup(instance => instance.getSummary())
        .returns(response);

      expect(effects.loadSummary$).toBeObservable(expected);
    });

    it("should return a DashboardSummaryFailure on server error", () => {

      const effects = get<DashboardEffects>();

      const action = new DashboardSummaryRequest();
      const error = "Error!";
      const completion = new DashboardSummaryFailure(error);

      actions$.stream = hot("-a", {a: action});
      const response = cold("-#", {}, error);
      const expected = cold("--c", {c: completion});

      resolve<DashboardServiceProxy>(DashboardServiceProxy)
        .setup(instance => instance.getSummary())
        .returns(response);

      expect(effects.loadSummary$).toBeObservable(expected);
    });
  });
});
