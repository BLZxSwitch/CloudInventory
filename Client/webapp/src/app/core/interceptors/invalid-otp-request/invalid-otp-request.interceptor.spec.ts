import { HttpErrorResponse, HttpHandler, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { cold, getTestScheduler } from "jasmine-marbles";
import { Times } from "moq.ts";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { StrictMock } from "../../../../unit-tests.components/moq/strict-mock";
import * as fromRoot from "../../../reducers";
import { HttpError } from "../../../shared/http-errors/http-error";
import { OtpRequestErrorAction } from "../../actions/otp-request-error.action";
import { ErrorToStringProvider } from "../bad-request/error-to-string.provider";
import { InvalidOtpActivationRequestInterceptor } from "./invalid-otp-request.interceptor";

describe("Invalid otp activation error request interceptor", () => {

  beforeEach(() => {
    createInjector(InvalidOtpActivationRequestInterceptor);
  });

  it("Should be resolved", () => {
    const actual = get<InvalidOtpActivationRequestInterceptor>();
    expect(actual).toEqual(jasmine.any(InvalidOtpActivationRequestInterceptor));
  });

  it("Dispatches OtpActivationError action on InvalidOtpActivationRequest", () => {
    const badRequestKey = "\"OTP_INVALID_REQUEST\"";
    const errorContent = "INVALID_REQUEST";

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

    const interceptor = get<InvalidOtpActivationRequestInterceptor>();
    interceptor.intercept(request, httpHandler)
      .subscribe(() => ({}), () => {
        resolve<Store<fromRoot.IState>>(Store)
          .verify(instance => instance.dispatch(Is.Eq(new OtpRequestErrorAction())), Times.Once());
      });
    getTestScheduler().flush();
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

    const interceptor = get<InvalidOtpActivationRequestInterceptor>();
    const actual = interceptor.intercept(request, httpHandler);

    expect(actual).toBeObservable(cold("#", null, response));
  });
});
