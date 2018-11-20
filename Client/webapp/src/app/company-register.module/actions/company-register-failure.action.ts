import { Action } from "@ngrx/store";

export class CompanyRegisterFailureAction implements Action {
  public static readonly type = "[Company Register] Company Registration Failure";
  public readonly type = CompanyRegisterFailureAction.type;

  constructor(public payload: any) {
  }
}
