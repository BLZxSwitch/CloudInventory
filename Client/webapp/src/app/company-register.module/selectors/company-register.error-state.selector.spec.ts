import { Mock } from "moq.ts";
import { ICompanyRegisterRootState } from "../store/company-register.root.state";
import { ICompanyRegisterState } from "../store/company-register.state";
import { companyRegisterErrorStateSelector } from "./company-register.error-state.selector";

describe("company register error state selector", () => {

  it("Returns root state", () => {
    const error = "error";

    const state = new Mock<ICompanyRegisterState>()
      .setup(instance => instance.error)
      .returns(error)
      .object();

    const rootState = new Mock<ICompanyRegisterRootState>()
      .setup(instance => instance.companyRegister)
      .returns(state)
      .object();

    const actual = companyRegisterErrorStateSelector(rootState);
    expect(actual).toBe(error);
  });
});
