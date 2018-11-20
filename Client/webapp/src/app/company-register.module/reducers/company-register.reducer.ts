import { LoginSuccess } from "../../auth/actions/auth.actions";
import { CompanyRegisterFailureAction } from "../actions/company-register-failure.action";
import { CompanyRegisterAction } from "../actions/company-register.action";
import { ICompanyRegisterState } from "../store/company-register.state";

type CompanyRegisterActions = CompanyRegisterAction | LoginSuccess | CompanyRegisterFailureAction;

const initialState: ICompanyRegisterState = {
  pending: false,
  error: undefined
};

export function companyRegisterReducer(state = initialState, action: CompanyRegisterActions): ICompanyRegisterState {
  if (action instanceof CompanyRegisterAction) {
    return {
      ...state,
      error: undefined,
      pending: true
    };
  }

  if (action instanceof LoginSuccess) {
    return {
      ...state,
      error: undefined,
      pending: false
    };
  }

  if (action instanceof CompanyRegisterFailureAction) {
    return {
      ...state,
      error: (action as CompanyRegisterFailureAction).payload,
      pending: false
    };
  }

  return state;
}
