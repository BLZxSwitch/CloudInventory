import { AuthActionsUnion, AuthActionTypes } from "../actions/auth.actions";
import { UserSettingsActionsUnion, UserSettingsActionTypes } from "../actions/user-settings.actions";

export interface IState {
  language: string;
  isTwoFactorAuthenticationEnabled: boolean;
  // hasUserPicture: boolean;
}

export const initialState: IState = {
  language: undefined,
  isTwoFactorAuthenticationEnabled: undefined,
  // hasUserPicture: undefined,
};

export function reducer(state = initialState, action: AuthActionsUnion | UserSettingsActionsUnion): IState {
  switch (action.type) {
    case AuthActionTypes.MeRequestSuccess:
    case AuthActionTypes.LoginSuccess: {
      const {
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      } = action.payload.user.userSettings;
      return {
        ...state,
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      };
    }

    case UserSettingsActionTypes.UserSettingsUpdateSuccess:
    case UserSettingsActionTypes.UserSettingsRequestSuccess: {
      const {
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      } = action.payload.userSettings;
      return {
        ...state,
        isTwoFactorAuthenticationEnabled,
        language,
        // hasUserPicture,
      };
    }

    default: {
      return state;
    }
  }
}

export const getLanguage = (state: IState) => state.language;
export const getIsTwoFactorAuthenticationEnabled = (state: IState) => state.isTwoFactorAuthenticationEnabled;
