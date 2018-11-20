import { HttpErrorResponse, HttpHandler, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { Times } from "moq.ts";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import { Logout } from "../../../auth/actions/auth.actions";
import * as fromAuth from "../../../auth/reducers";
import { UnauthorizedRequestInterceptor } from "./unauthorized-request.interceptor";

describe("Unauthorized request interceptor", () => {

  beforeEach(() => {
    createInjector(UnauthorizedRequestInterceptor);
  });

  it("Should be resolved", () => {
    const actual = get<UnauthorizedRequestInterceptor>();
    expect(actual).toEqual(jasmine.any(UnauthorizedRequestInterceptor));
  });

  it("Dispatches Logout action on 401", () => {

    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(401)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<UnauthorizedRequestInterceptor>();
    interceptor.intercept(request, httpHandler)
      .subscribe(() => ({}), () => {
        resolve<Store<fromAuth.IState>>(Store)
          .verify(instance => instance.dispatch(Is.Eq(new Logout())), Times.Once());
      });
  });

  it("Dispatches Logout action on 403", () => {

    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(403)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<UnauthorizedRequestInterceptor>();
    interceptor.intercept(request, httpHandler)
      .subscribe(() => ({}), () => {
        resolve<Store<fromAuth.IState>>(Store)
          .verify(instance => instance.dispatch(Is.Eq(new Logout())), Times.Once());
      });
  });

  it("Ignores non unauthorized request response", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(400)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<UnauthorizedRequestInterceptor>();
    interceptor.intercept(request, httpHandler)
      .subscribe(() => ({}), () => {
        resolve<Store<fromAuth.IState>>(Store)
          .verify(instance => instance.dispatch(Is.Eq(new Logout())), Times.Never());
      });
  });
});
