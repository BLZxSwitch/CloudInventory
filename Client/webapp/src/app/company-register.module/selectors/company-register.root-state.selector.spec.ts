import { Mock } from "moq.ts";
import { ICompanyRegisterRootState } from "../store/company-register.root.state";
import { ICompanyRegisterState } from "../store/company-register.state";
import { companyRegisterRootStateSelector } from "./company-register.root-state.selector";

describe("company register root state selector", () => {

  it("Returns root state", () => {
    const state = new Mock<ICompanyRegisterState>()
      .object();
    const rootState = new Mock<ICompanyRegisterRootState>()
      .setup(instance => instance.companyRegister)
      .returns(state)
      .object();

    const actual = companyRegisterRootStateSelector(rootState);
    expect(actual).toBe(state);
  });
});
