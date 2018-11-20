import { createSelector } from "@ngrx/store";
import { ICompanyRegisterState } from "../store/company-register.state";
import { companyRegisterRootStateSelector } from "./company-register.root-state.selector";

export const companyRegisterPendingStateSelector = createSelector(
  companyRegisterRootStateSelector,
  (state: ICompanyRegisterState) => state.pending
);
