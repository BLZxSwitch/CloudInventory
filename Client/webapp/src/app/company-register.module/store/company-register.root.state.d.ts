import * as fromRoot from "../../reducers";
import { ICompanyRegisterState } from "./company-register.state";

export interface ICompanyRegisterRootState extends fromRoot.IState {
  companyRegister: ICompanyRegisterState;
}
