import { Mock } from "moq.ts";
import { ICompanyRegisterRootState } from "../store/company-register.root.state";
import { ICompanyRegisterState } from "../store/company-register.state";
import { companyRegisterPendingStateSelector } from "./company-register.pending-state.selector";

describe("company register pending state selector", () => {

  it("Returns root state", () => {
    const isPending = true;

    const state = new Mock<ICompanyRegisterState>()
      .setup(instance => instance.pending)
      .returns(isPending)
      .object();

    const rootState = new Mock<ICompanyRegisterRootState>()
      .setup(instance => instance.companyRegister)
      .returns(state)
      .object();

    const actual = companyRegisterPendingStateSelector(rootState);
    expect(actual).toBe(isPending);
  });
});
