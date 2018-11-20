import { AuthActionsUnion, AuthActionTypes } from "../actions/auth.actions";

export interface IState {
  email: string;
  employeeId: string;
  isCompanyAdministrator: boolean;
  fullName: string;
}

export const initialState: IState = {
  email: undefined,
  employeeId: undefined,
  isCompanyAdministrator: undefined,
  fullName: undefined
};

export function reducer(state = initialState, action: AuthActionsUnion): IState {
  switch (action.type) {
    case AuthActionTypes.MeRequestSuccess:
    case AuthActionTypes.LoginSuccess: {
      const {email, employeeId, isCompanyAdministrator, fullName} = action.payload.user;
      return {
        ...state,
        email,
        employeeId,
        isCompanyAdministrator,
        fullName
      };
    }

    default: {
      return state;
    }
  }
}

export const getEmployeeId = (state: IState) => state.employeeId;
export const getFullName = (state: IState) => state.fullName;
export const isAdmin = (state: IState) => state.isCompanyAdministrator;
