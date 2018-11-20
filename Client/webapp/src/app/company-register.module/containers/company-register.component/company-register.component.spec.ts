import { Store } from "@ngrx/store";
import { Mock } from "moq.ts";
import { Subject } from "rxjs";
import { createInjector, get, resolve } from "../../../../unit-tests.components/mocks/createInjector";
import { Is } from "../../../../unit-tests.components/moq/equal";
import { ICompanyRegisterRequest } from "../../../core/services/service-proxies";
import { CompanyRegisterAction } from "../../actions/company-register.action";
import { CompanyRegisterErrorStateProvider } from "../../services/company-register.error-state.provider";
import { CompanyRegisterPendingSateProvider } from "../../services/company-register.pending-sate.provider";
import { ICompanyRegisterRootState } from "../../store/company-register.root.state";
import { CompanyRegisterComponent } from "./company-register.component";

describe("Company register component", () => {

  beforeEach(() => {
    createInjector(CompanyRegisterComponent);
  });

  it("Should be resolved", () => {
    const actual = get<CompanyRegisterComponent>();
    expect(actual).toEqual(jasmine.any(CompanyRegisterComponent));
  });

  it("Dispatches company register event", () => {
    const model = new Mock<ICompanyRegisterRequest>()
      .object();

    const component = get<CompanyRegisterComponent>();
    component.onSubmit(model);

    const action = new CompanyRegisterAction(model);
    resolve<Store<ICompanyRegisterRootState>>(Store)
      .verify(instance => instance.dispatch(Is.Eq(action)));
  });

  it("Exposes pending state", () => {
    const observable = new Subject<boolean>();
    resolve<CompanyRegisterPendingSateProvider>(CompanyRegisterPendingSateProvider)
      .setup(instance => instance.$value)
      .returns(observable);

    const component = get<CompanyRegisterComponent>();
    const actual = component.pending$;

    expect(actual).toBe(observable);
  });

  it("Exposes error state", () => {
    const observable = new Subject<string>();
    resolve<CompanyRegisterErrorStateProvider>(CompanyRegisterErrorStateProvider)
      .setup(instance => instance.$value)
      .returns(observable);

    const component = get<CompanyRegisterComponent>();
    const actual = component.error$;

    expect(actual).toBe(observable);
  });

});
