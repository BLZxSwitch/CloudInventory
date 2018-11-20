import { HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest, HttpResponseBase } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { cold, getTestScheduler } from "jasmine-marbles";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import * as fromRoot from "../../../reducers";
import { HttpFinalized, HttpStarted } from "../../actions/htpp-loading-indicator.actions";
import { Is } from "./../../../../unit-tests.components/moq/equal";
import { HttpLoadingIndicatorInterceptor } from "./http-loading-indicator.interceptor";

describe("Http loading indicator interceptor", () => {

  beforeEach(() => {
    createInjector(HttpLoadingIndicatorInterceptor);
  });

  it("Should be resolved", () => {
    const actual = get<HttpLoadingIndicatorInterceptor>();
    expect(actual).toEqual(jasmine.any(HttpLoadingIndicatorInterceptor));
  });

  it("Dispatches HttpStarted and HttpFinalized action on successful request", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .setup(item => item.url)
      .returns("")
      .object();

    const responseHeaders = new StrictMock<HttpHeaders>()
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

    const interceptor = get<HttpLoadingIndicatorInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("s|", {s: response}));

    const httpStartedAction = new HttpStarted();
    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(httpStartedAction)));

    getTestScheduler().flush();

    const httpFinalizedAction = new HttpFinalized();
    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(httpFinalizedAction)));
  });

  it("Dispatches HttpStarted and HttpFinalized action on failed request", () => {
    const request = new StrictMock<HttpRequest<any>>()
      .setup(item => item.url)
      .returns("")
      .object();

    const response = new StrictMock<HttpErrorResponse>()
      .prototypeof(HttpErrorResponse)
      .object();

    const httpHandler = new StrictMock<HttpHandler>()
      .setup(instance => instance.handle(request))
      .returns(cold("#", null, response))
      .object();

    const interceptor = get<HttpLoadingIndicatorInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));

    const httpStartedAction = new HttpStarted();
    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(httpStartedAction)));

    getTestScheduler().flush();

    const httpFinalizedAction = new HttpFinalized();
    resolve<Store<fromRoot.IState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(httpFinalizedAction)));
  });
});
