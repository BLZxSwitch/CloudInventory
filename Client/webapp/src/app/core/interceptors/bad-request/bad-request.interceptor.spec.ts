import { HttpErrorResponse, HttpHandler, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { cold } from "jasmine-marbles";
import { Times } from "moq.ts";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import { LoginRedirect } from "../../../auth/actions/auth.actions";
import { InvalidOtpTokenError } from "../../../otp-auth.module/errors/otp-token-invalid.error";
import * as fromRoot from "../../../reducers";
import { HttpError } from "../../../shared/http-errors/http-error";
import { BadRequestMapper } from "../../services/bad-request.mapper/bad-request.mapper";
import { BadRequestInterceptor } from "./bad-request.interceptor";
import { ErrorToStringProvider } from "./error-to-string.provider";

describe("Bad request interceptor", () => {

  beforeEach(() => {
    createInjector(BadRequestInterceptor);
  });

  it("Should be resolved", () => {
    const actual = get<BadRequestInterceptor>();
    expect(actual).toEqual(jasmine.any(BadRequestInterceptor));
  });

  it("Returns mapped error", () => {
    const badRequestKey = "INVALID_REQUEST";
    const errorContent = "could be string blob or array";
    const mappedError = {};

    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(400)
      .setup(instance => instance.error)
      .returns(errorContent)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    resolve<ErrorToStringProvider>(ErrorToStringProvider)
      .setup(instance => instance.get(errorContent))
      .returns(cold("a|", {a: badRequestKey}));

    resolve<BadRequestMapper>(BadRequestMapper)
      .setup(instance => instance.get(badRequestKey))
      .returns(mappedError);

    const interceptor = get<BadRequestInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, mappedError));
  });

  it("Redirect to login page if error is InvalidOtpTokenError", () => {
    const badRequestKey = "INVALID_REQUEST";
    const errorContent = "could be string blob or array";
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(400)
      .setup(instance => instance.error)
      .returns(errorContent)
      .prototypeof(HttpErrorResponse)
      .object();

    const mappedError = new InvalidOtpTokenError(request, response);

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    resolve<ErrorToStringProvider>(ErrorToStringProvider)
      .setup(instance => instance.get(errorContent))
      .returns(cold("a|", {a: badRequestKey}));

    resolve<BadRequestMapper>(BadRequestMapper)
      .setup(instance => instance.get(badRequestKey))
      .returns(mappedError);

    const interceptor = get<BadRequestInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, mappedError));

    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(new LoginRedirect())), Times.Once());
  });

  it("Should not redirect to login page if error is InvalidOtpTokenError", () => {
    const badRequestKey = "INVALID_REQUEST";
    const errorContent = "could be string blob or array";
    const mappedError = {};

    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(400)
      .setup(instance => instance.error)
      .returns(errorContent)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    resolve<ErrorToStringProvider>(ErrorToStringProvider)
      .setup(instance => instance.get(errorContent))
      .returns(cold("a|", {a: badRequestKey}));

    resolve<BadRequestMapper>(BadRequestMapper)
      .setup(instance => instance.get(badRequestKey))
      .returns(mappedError);

    const interceptor = get<BadRequestInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, mappedError));

    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(new LoginRedirect())), Times.Never());
  });

  it("Ignores unmapped", () => {
    const badRequestKey = "badRequestKey";
    const errorContent = "could be string blob or array";

    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(400)
      .setup(instance => instance.error)
      .returns(errorContent)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    resolve<ErrorToStringProvider>(ErrorToStringProvider)
      .setup(instance => instance.get(errorContent))
      .returns(cold("a|", {a: badRequestKey}));

    resolve<BadRequestMapper>(BadRequestMapper)
      .setup(instance => instance.get(badRequestKey))
      .returns(undefined);

    const interceptor = get<BadRequestInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });

  it("Ignores non bad request response", () => {
    const error = "badRequestKey";

    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(401)
      .setup(instance => instance.error)
      .returns(error)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<BadRequestInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });

  it("Ignores not HttpErrorResponse responses", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpError>()
      .prototypeof(HttpError)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<BadRequestInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });
});
