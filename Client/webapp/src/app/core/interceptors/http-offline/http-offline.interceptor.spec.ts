import { HttpErrorResponse, HttpHandler, HttpRequest } from "@angular/common/http";
import { cold } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import { HttpError } from "../../../shared/http-errors/http-error";
import { HttpOfflineError } from "../../../shared/http-errors/http-offline-error";
import { NavigatorWebApiProvider } from "../../services/navigator.web-api.provider";
import { HttpOfflineInterceptor } from "./http-offline.interceptor";

describe("Http offline interceptor", () => {

  beforeEach(() => {
    createInjector(HttpOfflineInterceptor);
  });

  it("Should be resolved", () => {
    const actual = get<HttpOfflineInterceptor>();
    expect(actual).toEqual(jasmine.any(HttpOfflineInterceptor));
  });

  it("Returns HttpTimeoutError on unknown error", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(0)
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const navigatorOnLine = new StrictMock<NavigatorOnLine>()
      .setup(instance => instance.onLine)
      .returns(false)
      .object();

    resolve<NavigatorWebApiProvider>(NavigatorWebApiProvider)
      .setup(instance => instance.get())
      .returns(navigatorOnLine);

    const interceptor = get<HttpOfflineInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, new HttpOfflineError(response)));
  });

  it("Ignores http error response where status is not 0", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(200)
      .prototypeof(HttpErrorResponse)
      .object();

    const navigatorOnLine = new StrictMock<NavigatorOnLine>()
      .setup(instance => instance.onLine)
      .returns(false)
      .object();

    resolve<NavigatorWebApiProvider>(NavigatorWebApiProvider)
      .setup(instance => instance.get())
      .returns(navigatorOnLine);

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<HttpOfflineInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });

  it("Ignores http error response when navigator is online", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .setup(instance => instance.status)
      .returns(0)
      .prototypeof(HttpErrorResponse)
      .object();

    const navigatorOnLine = new StrictMock<NavigatorOnLine>()
      .setup(instance => instance.onLine)
      .returns(true)
      .object();

    resolve<NavigatorWebApiProvider>(NavigatorWebApiProvider)
      .setup(instance => instance.get())
      .returns(navigatorOnLine);

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<HttpOfflineInterceptor>();
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

    const interceptor = get<HttpOfflineInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });
});
