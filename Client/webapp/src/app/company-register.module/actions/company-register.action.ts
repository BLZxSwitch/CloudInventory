import { Action } from "@ngrx/store";
import { ICompanyRegisterRequest } from "../../core/services/service-proxies";

export class CompanyRegisterAction implements Action {
  public readonly type = "[Company Register] Company Register";

  constructor(public payload: ICompanyRegisterRequest) {
  }
}
