import { Store } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { StrictMock } from "../../../unit-tests.components/moq/strict-mock";
import { setupPipe } from "../../../unit-tests.components/setup-pipe";
import * as fromAuth from "../../auth/reducers";
import { AdminGuard } from "./admin-guard.service";

describe("AdminGuard", () => {

  beforeEach(() => {
    createInjector(AdminGuard);
  });

  it("should return true when user is admin", () => {
    const user = {
      isCompanyAdministrator: true,
    };

    const authState = new StrictMock<fromAuth.IAuthState>()
      .setup(instance => instance.user)
      .returns(user)
      .object();

    const state = new StrictMock<fromAuth.IState>()
      .setup(instance => instance.auth)
      .returns(authState)
      .object();

    const store = cold("s", {s: state});
    setupPipe(resolve<Store<fromAuth.IState>>(Store), store);

    const guard = get<AdminGuard>();

    const expected = cold("(a|)", {a: true});
    expect(guard.canActivate()).toBeObservable(expected);
  });

  it("should return false when user is not admin", () => {
    const user = {
      isCompanyAdministrator: false,
    };

    const authState = new StrictMock<fromAuth.IAuthState>()
      .setup(instance => instance.user)
      .returns(user)
      .object();

    const state = new StrictMock<fromAuth.IState>()
      .setup(instance => instance.auth)
      .returns(authState)
      .object();

    const store = cold("s", {s: state});
    setupPipe(resolve<Store<fromAuth.IState>>(Store), store);

    const guard = get<AdminGuard>();

    const expected = cold("(a|)", {a: false});
    expect(guard.canActivate()).toBeObservable(expected);
  });
});
