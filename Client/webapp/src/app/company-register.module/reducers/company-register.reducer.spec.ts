import { LoginSuccess } from "../../auth/actions/auth.actions";
import { CompanyRegisterFailureAction } from "../actions/company-register-failure.action";
import { CompanyRegisterAction } from "../actions/company-register.action";
import { ICompanyRegisterState } from "../store/company-register.state";
import { companyRegisterReducer } from "./company-register.reducer";

describe("Company register reducer:", () => {
  it("Returns default state", () => {
    const actual = companyRegisterReducer(undefined, {} as CompanyRegisterAction);

    const expected: ICompanyRegisterState = {
      error: undefined,
      pending: false
    };
    expect(actual).toEqual(expected);
  });

  it("Returns state after CompanyRegisterAction", () => {
    const actual = companyRegisterReducer(undefined, new CompanyRegisterAction(undefined));

    const expected: ICompanyRegisterState = {
      error: undefined,
      pending: true
    };
    expect(actual).toEqual(expected);
  });

  it("Returns state after LoginSuccess", () => {
    const actual = companyRegisterReducer(undefined, new LoginSuccess(undefined));

    const expected: ICompanyRegisterState = {
      error: undefined,
      pending: false
    };
    expect(actual).toEqual(expected);
  });

  it("Returns state after CompanyRegisterFailureAction", () => {
    const payload = "error";
    const actual = companyRegisterReducer(undefined, new CompanyRegisterFailureAction(payload));

    const expected: ICompanyRegisterState = {
      error: payload,
      pending: false
    };
    expect(actual).toEqual(expected);
  });
});
