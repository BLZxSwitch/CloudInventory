import { AuthActionsUnion, AuthActionTypes } from "../actions/auth.actions";

export interface IState {
  token: string;
}

export const initialState: IState = {
  token: undefined,
};

export function reducer(state = initialState, action: AuthActionsUnion): IState {
  switch (action.type) {
    case AuthActionTypes.OtpRedirect: {
      const {token} = action.payload;
      return {
        ...state,
        token,
      };
    }

    case AuthActionTypes.OtpAuthClean: {
      return {
        ...state,
        token: undefined,
      };
    }

    default: {
      return state;
    }
  }
}

export const getOtpAuthToken = (state: IState) => state;
