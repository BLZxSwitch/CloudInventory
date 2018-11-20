import { cold, hot } from "jasmine-marbles";
import { createInjectorWithActions, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Logout } from "../../auth/actions/auth.actions";
import { TermsOfServiceServiceProxy } from "../../core/services/service-proxies";
import { TermsOfServiceApproveRequest, TermsOfServiceApproveSuccess, TermsOfServiceDecline } from "../actions/terms-of-service.actions";
import { TermsOfServiceEffects } from "./terms-of-service.effects";

describe("TermsOfServiceEffects", () => {

  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActions(TermsOfServiceEffects);
  });

  describe("approveRequest$", () => {
    it("should return a TermsOfServiceApproveSuccess on TermsOfServiceApproveRequest when accept is successful", () => {
      const effects = get<TermsOfServiceEffects>();

      const completion = new TermsOfServiceApproveSuccess();

      actions$.stream = hot("-a", {
          a: new TermsOfServiceApproveRequest()
        }
      );

      const response = cold("-b");

      resolve<TermsOfServiceServiceProxy>(TermsOfServiceServiceProxy)
        .setup(instance => instance.accept(true))
        .returns(response);

      const expected = cold("--c", {c: completion});

      expect(effects.approveRequest$).toBeObservable(expected);
    });
  });

  describe("decline$", () => {
    it("should return a Logout on TermsOfServiceDecline", () => {
      const effects = get<TermsOfServiceEffects>();

      const completion = new Logout();

      actions$.stream = hot("-a", {
          a: new TermsOfServiceDecline()
        }
      );

      const expected = cold("-b", {b: completion});

      expect(effects.decline$).toBeObservable(expected);
    });
  });
});
