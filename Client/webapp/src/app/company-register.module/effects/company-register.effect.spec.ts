import { Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { It, Mock, Times } from "moq.ts";
import { of } from "rxjs/index";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { setupPipe } from "../../../unit-tests.components/setup-pipe";
import { subscribe } from "../../../unit-tests.components/subscribe";
import { LoginSuccess } from "../../auth/actions/auth.actions";
import { ICompanyRegisterRequest } from "../../core/services/service-proxies";
import { CompanyRegisterAction } from "../actions/company-register.action";
import { CompanyRegisterService } from "../services/company-register.service";
import { CompanyRegisterEffect } from "./company-register.effect";

describe("Company register effect", () => {

  beforeEach(() => {
    createInjector(CompanyRegisterEffect);
  });

  it("Should be resolved", () => {
    const actual = get<CompanyRegisterEffect>();
    expect(actual).toEqual(jasmine.any(CompanyRegisterEffect));
  });

  it("Returns company creation action", () => {
    const companyRegisterModel = new Mock<ICompanyRegisterRequest>()
      .object();
    const loginSuccess = new LoginSuccess(undefined);

    const actions$ = of(new CompanyRegisterAction(companyRegisterModel));
    setupPipe<CompanyRegisterAction>(resolve(Actions), actions$);

    resolve<CompanyRegisterService>(CompanyRegisterService)
      .setup(instance => instance.register(companyRegisterModel))
      .returns(of(loginSuccess));

    const effect = get<CompanyRegisterEffect>();

    const success = subscribe(effect.effect$).success;
    expect(success).toHaveBeenCalledWith(loginSuccess);
  });

  it("Ignores other actions", () => {
    class TestAction implements Action {
      public type: string;
    }

    const testAction = new TestAction();

    const actions$ = of(testAction);
    setupPipe<Action>(resolve(Actions), actions$);

    const effect = get<CompanyRegisterEffect>();

    subscribe(effect.effect$);
    resolve<CompanyRegisterService>(CompanyRegisterService)
      .verify(instance => instance.register(It.IsAny()), Times.Never());
  });
});
