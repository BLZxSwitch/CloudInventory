import { Store } from "@ngrx/store";
import { cold, hot } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../unit-tests.components/moq/equal";
import { StrictMock } from "../../../unit-tests.components/moq/strict-mock";
import { setupPipe } from "../../../unit-tests.components/setup-pipe";
import { ISignInRequest } from "../../core/services/service-proxies";
import * as fromBasicPage from "../../shared/reducer-creators/basic-page.reducer-creator";
import * as AuthActions from "../actions/auth.actions";
import * as fromAuth from "../reducers";
import { LoginPageComponent } from "./login-page.component";

describe("Login page", () => {

  beforeEach(() => {
    createInjector(LoginPageComponent);
  });

  it("Should be resolved", () => {
    const actual = get<LoginPageComponent>();
    expect(actual).toEqual(jasmine.any(LoginPageComponent));
  });

  it("Dispatches login action on submit", () => {
    const payload = new StrictMock<ISignInRequest>().object();

    const component = get<LoginPageComponent>();
    component.onSubmit(payload);

    resolve<Store<fromAuth.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(new AuthActions.Login(payload))));
  });

  it("Exposes observable on pending state ", () => {
    const isPending = true;

    const loginPageState = new StrictMock<fromBasicPage.IState>()
      .setup(instance => instance.pending)
      .returns(isPending)
      .object();

    const authState = new StrictMock<fromAuth.IAuthState>()
      .setup(instance => instance.loginPage)
      .returns(loginPageState)
      .object();

    const state = new StrictMock<fromAuth.IState>()
      .setup(instance => instance.auth)
      .returns(authState)
      .object();

    const store = hot("-s", {s: state});
    setupPipe(resolve<Store<fromAuth.IState>>(Store), store);

    const component = get<LoginPageComponent>();

    const expected = cold("-c", {c: isPending});
    expect(component.pending$).toBeObservable(expected);
  });

  it("Exposes observable on error state ", () => {
    const error = "error";

    const loginPageState = new StrictMock<fromBasicPage.IState>()
      .setup(instance => instance.error)
      .returns(error)
      .object();

    const authState = new StrictMock<fromAuth.IAuthState>()
      .setup(instance => instance.loginPage)
      .returns(loginPageState)
      .object();

    const state = new StrictMock<fromAuth.IState>()
      .setup(instance => instance.auth)
      .returns(authState)
      .object();

    const store = hot("-s", {s: state});
    setupPipe(resolve<Store<fromAuth.IState>>(Store), store);

    const component = get<LoginPageComponent>();

    const expected = cold("-c", {c: error});
    expect(component.error$).toBeObservable(expected);
  });
});
