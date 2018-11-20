import { Store } from "@ngrx/store";
import { Mock } from "moq.ts";
import { BehaviorSubject } from "rxjs";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { setupPipe } from "../../../unit-tests.components/setup-pipe";
import { subscribe } from "../../../unit-tests.components/subscribe";
import { ICompanyRegisterRootState } from "../store/company-register.root.state";
import { ICompanyRegisterState } from "../store/company-register.state";
import { CompanyRegisterPendingSateProvider } from "./company-register.pending-sate.provider";

describe("Company register pending state provider", () => {

  beforeEach(() => {
    createInjector(CompanyRegisterPendingSateProvider);
  });

  it("Should be resolved", () => {
    const actual = get<CompanyRegisterPendingSateProvider>();
    expect(actual).toEqual(jasmine.any(CompanyRegisterPendingSateProvider));
  });

  it("Returns an observable on pending state", () => {
    const isPending = true;

    const registerState = new Mock<ICompanyRegisterState>()
      .setup(instance => instance.pending)
      .returns(isPending)
      .object();

    const stateDomain = new Mock<ICompanyRegisterRootState>()
      .setup(instance => instance.companyRegister)
      .returns(registerState)
      .object();

    const store = new BehaviorSubject<ICompanyRegisterRootState>(stateDomain);
    setupPipe<ICompanyRegisterRootState>(resolve<Store<ICompanyRegisterRootState>>(Store), store);

    const provider = get<CompanyRegisterPendingSateProvider>();
    const actual = provider.$value;

    const success = subscribe(actual).success;
    expect(success).toHaveBeenCalledWith(isPending);
  });
});
