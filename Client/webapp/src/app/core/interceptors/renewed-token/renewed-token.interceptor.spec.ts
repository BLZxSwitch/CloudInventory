import {
  HttpDownloadProgressEvent,
  HttpErrorResponse,
  HttpEventType,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponseBase
} from "@angular/common/http";
import { cold } from "jasmine-marbles";
import { It, Times } from "moq.ts";
import { AuthService } from "ng2-ui-auth";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import { RenewedTokenInterceptor } from "./renewed-token.interceptor";

describe("Renewed token http interceptor", () => {

  beforeEach(() => {
    createInjector(RenewedTokenInterceptor);
  });

  it("Should be resolved", () => {
    const actual = get<RenewedTokenInterceptor>();
    expect(actual).toEqual(jasmine.any(RenewedTokenInterceptor));
  });

  it("Renews token", () => {
    const token = "token";

    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const responseHeaders = new StrictMock<HttpHeaders>()
      .setup(instance => instance.get("X-Renewed-Token"))
      .returns(token)
      .setup(instance => instance.has("X-Renewed-Token"))
      .returns(true)
      .object();

    const response = new StrictMock<HttpResponseBase>()
      .setup(instance => instance.headers)
      .returns(responseHeaders)
      .prototypeof(HttpResponseBase)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("s|", {s: response}))
      .object();

    const interceptor = get<RenewedTokenInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("s|", {s: response}));
    resolve<AuthService>(AuthService)
      .verify(instance => instance.setToken(token));
  });

  it("Does not renew token when token is not present", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const responseHeaders = new StrictMock<HttpHeaders>()
      .setup(instance => instance.has("X-Renewed-Token"))
      .returns(false)
      .object();

    const response = new StrictMock<HttpResponseBase>()
      .setup(instance => instance.headers)
      .returns(responseHeaders)
      .prototypeof(HttpResponseBase)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("s|", {s: response}))
      .object();

    const interceptor = get<RenewedTokenInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("s|", {s: response}));
    resolve<AuthService>(AuthService)
      .verify(instance => instance.setToken(It.IsAny()), Times.Never());
  });

  it("Does not renew token when response is not instance of HttpResponseBase type", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpDownloadProgressEvent>()
      .setup(instance => instance.type)
      .returns(HttpEventType.DownloadProgress)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("s|", {s: response}))
      .object();

    const interceptor = get<RenewedTokenInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("s|", {s: response}));
    resolve<AuthService>(AuthService)
      .verify(instance => instance.setToken(It.IsAny()), Times.Never());
  });

  it("Does not renew token when response is an error", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<RenewedTokenInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
    resolve<AuthService>(AuthService)
      .verify(instance => instance.setToken(It.IsAny()), Times.Never());
  });
});
