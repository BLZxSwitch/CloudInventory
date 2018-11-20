import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromBasicPage from "../../shared/reducer-creators/basic-page.reducer-creator";
import { getSelectors } from "../../shared/reducer-creators/basic-page.reducer-creator";
import { AuthActionTypes } from "../actions/auth.actions";
import { IAuthFailedState } from "../store/auth-failed.state";
import * as fromAuthFailed from "./auth-failed.reducer";
import * as fromAuthStatus from "./auth-status.reducer";
import * as fromOtpAuthToken from "./otp-auth.reducer";
import * as fromUserSettings from "./user-settings.reducer";
import * as fromUser from "./user.reducer";

export interface IAuthState {
  authStatus: fromAuthStatus.IState;
  authFailed: IAuthFailedState;
  user: fromUser.IState;
  userSettings: fromUserSettings.IState;
  loginPage: fromBasicPage.IState;
  otpEnterCodePage: fromBasicPage.IState;
  forgotPasswordPage: fromBasicPage.IState;
  resetPasswordPage: fromBasicPage.IState;
  setPasswordPage: fromBasicPage.IState;
  otpAuthToken: fromOtpAuthToken.IState;
}

export interface IState extends fromRoot.IState {
  auth: IAuthState;
}

export function reducers(): ActionReducerMap<IAuthState> {
  return {
    authStatus: fromAuthStatus.reducer,
    authFailed: fromAuthFailed.reducer,
    user: fromUser.reducer,
    userSettings: fromUserSettings.reducer,
    loginPage: fromBasicPage.createBasicPageReducer(AuthActionTypes.Login,
      AuthActionTypes.LoginSuccess,
      AuthActionTypes.LoginFailure,
      AuthActionTypes.LoginClean),
    otpEnterCodePage: fromBasicPage.createBasicPageReducer(AuthActionTypes.OtpLogin,
      AuthActionTypes.LoginSuccess,
      AuthActionTypes.LoginFailure,
      AuthActionTypes.OtpRedirectClean),
    forgotPasswordPage: fromBasicPage.createBasicPageReducer(AuthActionTypes.ForgotPasswordRequest,
      AuthActionTypes.ForgotPasswordRequest,
      AuthActionTypes.ForgotPasswordFailure,
      AuthActionTypes.ForgotPasswordClean),
    resetPasswordPage: fromBasicPage.createBasicPageReducer(AuthActionTypes.ResetPasswordRequest,
      AuthActionTypes.ResetPasswordSuccess,
      AuthActionTypes.ResetPasswordFailure,
      AuthActionTypes.ResetPasswordClean),
    setPasswordPage: fromBasicPage.createBasicPageReducer(AuthActionTypes.SetPasswordRequest,
      AuthActionTypes.SetPasswordSuccess,
      AuthActionTypes.SetPasswordFailure,
      AuthActionTypes.SetPasswordClean),
    otpAuthToken: fromOtpAuthToken.reducer
  };
}

export const selectAuthState = createFeatureSelector<IAuthState>("auth");

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: IAuthState) => state.authStatus
);

export const selectUserState = createSelector(
  selectAuthState,
  (state: IAuthState) => state.user
);

export const getUserSettings = createSelector(
  selectAuthState,
  (state: IAuthState) => state.userSettings
);

export const getOtpAuthToken = createSelector(
  selectAuthState,
  (state: IAuthState) => state.otpAuthToken
);

export const otpAuth = createSelector(getOtpAuthToken, fromOtpAuthToken.getOtpAuthToken);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuthStatus.getLoggedIn
);

export const isAdmin = createSelector(selectUserState, fromUser.isAdmin);

export const getEmployeeId = createSelector(selectUserState, fromUser.getEmployeeId);

export const getFullName = createSelector(selectUserState, fromUser.getFullName);

export const isTwoFactorAuthenticationEnabled = createSelector(getUserSettings,
  fromUserSettings.getIsTwoFactorAuthenticationEnabled);

export const getLanguage = createSelector(getUserSettings, fromUserSettings.getLanguage);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: IAuthState) => state.loginPage
);

export const selectOtpEnterCodePageState = createSelector(
  selectAuthState,
  (state: IAuthState) => state.otpEnterCodePage
);

export const {
  getPageError: getLoginPageError,
  getPagePending: getLoginPagePending,
} = getSelectors(selectLoginPageState);

export const {
  getPageError: getOtpEnterCodePageError,
  getPagePending: getOtpEnterCodePagePending,
} = getSelectors(selectOtpEnterCodePageState);

export const selectForgotPasswordPageState = createSelector(
  selectAuthState,
  (state: IAuthState) => state.forgotPasswordPage
);

export const {
  getPageError: getForgotPasswordPageError,
  getPagePending: getForgotPasswordPagePending,
} = getSelectors(selectForgotPasswordPageState);

export const selectResetPasswordPageState = createSelector(
  selectAuthState,
  (state: IAuthState) => state.resetPasswordPage
);

export const {
  getPageError: getResetPasswordPageError,
  getPagePending: getResetPasswordPagePending,
} = getSelectors(selectResetPasswordPageState);

export const selectSetPasswordPageState = createSelector(
  selectAuthState,
  (state: IAuthState) => state.setPasswordPage
);

export const {
  getPageError: getSetPasswordPageError,
  getPagePending: getSetPasswordPagePending,
} = getSelectors(selectSetPasswordPageState);
