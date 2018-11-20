import { HttpErrorResponse, HttpHandler, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { Times } from "moq.ts";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import { OtpRedirect } from "../../../auth/actions/auth.actions";
import * as fromRoot from "../../../reducers";
import { HttpError } from "../../../shared/http-errors/http-error";
import { RetryWithHttpCodeInterceptor } from "./retry-with-http-code.interceptor";

describe("Http internal server error interceptor", () => {

  beforeEach(() => {
    createInjector(RetryWithHttpCodeInterceptor);
  });

  it("Should be resolved", () => {
    const actual = get<RetryWithHttpCodeInterceptor>();
    expect(actual).toEqual(jasmine.any(RetryWithHttpCodeInterceptor));
  });

  it("Should dispatch OtpRedirect on 449 error status", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(449)
      .setup(instance => instance.error)
      .returns("token")
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<RetryWithHttpCodeInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));

    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(
        new OtpRedirect({token: response.error}))), Times.Once());
  });

  it("Should not dispatch OtpRedirect on error status different from 449", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(200)
      .setup(instance => instance.error)
      .returns("token")
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<RetryWithHttpCodeInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));

    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(
        new OtpRedirect({token: response.error}))), Times.Never());
  });

  it("Ignores http error response where status is not 500", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(200)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<RetryWithHttpCodeInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });

  it("Ignores other error types rather then HttpErrorResponse", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpError>()
      .prototypeof(HttpError)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<RetryWithHttpCodeInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });
});
