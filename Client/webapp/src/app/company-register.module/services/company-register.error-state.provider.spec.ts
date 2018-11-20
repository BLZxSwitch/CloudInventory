import { Store } from "@ngrx/store";
import { Mock } from "moq.ts";
import { of } from "rxjs/index";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { setupPipe } from "../../../unit-tests.components/setup-pipe";
import { subscribe } from "../../../unit-tests.components/subscribe";
import { ICompanyRegisterRootState } from "../store/company-register.root.state";
import { ICompanyRegisterState } from "../store/company-register.state";
import { CompanyRegisterErrorStateProvider } from "./company-register.error-state.provider";

describe("Company register error state provider", () => {

  beforeEach(() => {
    createInjector(CompanyRegisterErrorStateProvider);
  });

  it("Should be resolved", () => {
    const actual = get<CompanyRegisterErrorStateProvider>();
    expect(actual).toEqual(jasmine.any(CompanyRegisterErrorStateProvider));
  });

  it("Returns an observable on pending state", () => {
    const error = "error";

    const registerState = new Mock<ICompanyRegisterState>()
      .setup(instance => instance.error)
      .returns(error)
      .object();

    const stateDomain = new Mock<ICompanyRegisterRootState>()
      .setup(instance => instance.companyRegister)
      .returns(registerState)
      .object();

    const store = of(stateDomain);
    setupPipe<ICompanyRegisterRootState>(resolve<Store<ICompanyRegisterRootState>>(Store), store);

    const provider = get<CompanyRegisterErrorStateProvider>();
    const actual = provider.$value;

    const success = subscribe(actual).success;
    expect(success).toHaveBeenCalledWith(error);
  });
});
