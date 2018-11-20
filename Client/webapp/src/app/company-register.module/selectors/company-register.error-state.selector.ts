import { createSelector } from "@ngrx/store";
import { ICompanyRegisterState } from "../store/company-register.state";
import { companyRegisterRootStateSelector } from "./company-register.root-state.selector";

export const companyRegisterErrorStateSelector = createSelector(
  companyRegisterRootStateSelector,
  (state: ICompanyRegisterState) => state.error
);
