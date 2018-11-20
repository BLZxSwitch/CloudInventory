import { createFeatureSelector } from "@ngrx/store";
import { ICompanyRegisterState } from "../store/company-register.state";

export const companyRegisterRootStateSelector = createFeatureSelector<ICompanyRegisterState>("companyRegister");
