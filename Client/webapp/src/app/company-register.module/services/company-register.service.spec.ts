import { Mock } from "moq.ts";
import { AuthService } from "ng2-ui-auth";
import { of, throwError } from "rxjs/index";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { subscribe } from "../../../unit-tests.components/subscribe";
import { LoginSuccess } from "../../auth/actions/auth.actions";
import { ICompanyRegisterRequest, ISignInResponse, IUserDTO } from "../../core/services/service-proxies";
import { CompanyRegisterFailureAction } from "../actions/company-register-failure.action";
import { CompanyRegisterService } from "./company-register.service";

describe("Company register service", () => {

  beforeEach(() => {
    createInjector(CompanyRegisterService);
  });

  it("Should be resolved", () => {
    const actual = get<CompanyRegisterService>();
    expect(actual).toEqual(jasmine.any(CompanyRegisterService));
  });

  it("Returns login success when company has been created", () => {
    const user = new Mock<IUserDTO>().object();
    const response = new Mock<ISignInResponse>()
      .setup(instance => instance.user)
      .returns(user)
      .object();
    const companyRegisterModel = new Mock<ICompanyRegisterRequest>()
      .object();

    resolve<AuthService>(AuthService)
      .setup(instance => instance.signup(companyRegisterModel))
      .returns(of(response));

    const service = get<CompanyRegisterService>();

    const actual = service.register(companyRegisterModel);
    const success = subscribe(actual).success;
    expect(success).toHaveBeenCalledWith(new LoginSuccess({user}));
  });

  it("Sets token", () => {
    const token = "token";
    const user = new Mock<IUserDTO>().object();
    const response = new Mock<ISignInResponse>()
      .setup(instance => instance.token)
      .returns(token)
      .setup(instance => instance.user)
      .returns(user)
      .object();
    const companyRegisterModel = new Mock<ICompanyRegisterRequest>()
      .object();

    resolve<AuthService>(AuthService)
      .setup(instance => instance.signup(companyRegisterModel))
      .returns(of(response));

    const service = get<CompanyRegisterService>();

    const actual = service.register(companyRegisterModel);
    subscribe(actual);

    resolve<AuthService>(AuthService)
      .verify(instance => instance.setToken(token));
  });

  it("Returns login failure when company has not been created", () => {
    const model = new Mock<ICompanyRegisterRequest>()
      .object();

    const exception = new Error();
    resolve<AuthService>(AuthService)
      .setup(instance => instance.signup(model))
      .returns(throwError(exception));

    const service = get<CompanyRegisterService>();
    const actual = service.register(model);

    const success = subscribe(actual).success;
    expect(success).toHaveBeenCalledWith(new CompanyRegisterFailureAction(exception));
  });

});
