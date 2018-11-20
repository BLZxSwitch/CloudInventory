import { Action } from "@ngrx/store";
import { CompanyRegisterFailureAction } from "../../company-register.module/actions/company-register-failure.action";
import { AuthActionTypes } from "../actions/auth.actions";
import { IAuthFailedState } from "../store/auth-failed.state";

export const initialState: IAuthFailedState = {
  failedCount: 0,
};

export function reducer(state = initialState, action: Action): IAuthFailedState {
  switch (action.type) {
    case CompanyRegisterFailureAction.type:
    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.ForgotPasswordFailure: {
      return {
        ...state,
        failedCount: state.failedCount + 1,
      };
    }

    default: {
      return state;
    }
  }
}

export const getFailedCount = (state: IAuthFailedState) => state.failedCount;
