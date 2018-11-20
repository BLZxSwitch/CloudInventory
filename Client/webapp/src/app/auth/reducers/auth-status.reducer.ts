import { AuthActionsUnion, AuthActionTypes } from "../actions/auth.actions";

export interface IState {
  loggedIn: boolean;
}

export const initialState: IState = {
  loggedIn: false,
};

export function reducer(state = initialState, action: AuthActionsUnion): IState {
  switch (action.type) {
    case AuthActionTypes.MeRequestSuccess:
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        loggedIn: true,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: IState) => state.loggedIn;
