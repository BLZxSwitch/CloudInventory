import { Action } from "@ngrx/store";
import { IForgotPasswordRequest, IOtpSignInRequest, ISignInRequest, IUserDTO } from "../../core/services/service-proxies";

export enum AuthActionTypes {
  Login = "[Auth] Login",
  OtpLogin = "[Auth] Otp Login",
  OtpAuthClean = "[Auth] Otp Auth Clean",
  Logout = "[Auth] Logout",
  LoginSuccess = "[Auth] Login Success",
  LoginFailure = "[Auth] Login Failure",
  OtpRedirect = "[Auth] Otp Redirect",
  OtpRedirectClean = "[Auth] Otp Redirect Clean",
  LoginClean = "[Auth] Login Clean",
  LoginRedirect = "[Auth] Login Redirect",
  ForgotPasswordRequest = "[Auth] Forgot Password Request",
  ForgotPasswordSuccess = "[Auth] Forgot Password Success",
  ForgotPasswordFailure = "[Auth] Forgot Password Failure",
  ForgotPasswordClean = "[Auth] Forgot Password Clean",
  ResetPasswordRequest = "[Auth] Reset Password Request",
  ResetPasswordSuccess = "[Auth] Reset Password Success",
  ResetPasswordFailure = "[Auth] Reset Password Failure",
  ResetPasswordClean = "[Auth] Reset Password Clean",
  SetPasswordRequest = "[Auth] Set Password Request",
  SetPasswordSuccess = "[Auth] Set Password Success",
  SetPasswordFailure = "[Auth] Set Password Failure",
  SetPasswordClean = "[Auth] Set Password Clean",
  MeRequestSuccess = "[Auth] Me Request Success",
}

export class Login implements Action {
  public readonly type = AuthActionTypes.Login;

  constructor(public payload: ISignInRequest) {
  }
}

export class OtpLogin implements Action {
  public readonly type = AuthActionTypes.OtpLogin;

  constructor(public payload: IOtpSignInRequest) {
  }
}

export class OtpAuthClean implements Action {
  public readonly type = AuthActionTypes.OtpAuthClean;

  constructor(public payload: any) {
  }
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;

  constructor(public payload: { user: IUserDTO }) {
  }
}

export class LoginFailure implements Action {
  public readonly type = AuthActionTypes.LoginFailure;

  constructor(public payload: any) {
  }
}

export class OtpRedirect implements Action {
  public readonly type = AuthActionTypes.OtpRedirect;

  constructor(public payload: { token: string }) {
  }
}

export class LoginClean implements Action {
  public readonly type = AuthActionTypes.LoginClean;

  constructor(public payload: any) {
  }
}

export class LoginRedirect implements Action {
  public readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  public readonly type = AuthActionTypes.Logout;
}

export class ForgotPasswordRequest implements Action {
  public readonly type = AuthActionTypes.ForgotPasswordRequest;

  constructor(public payload: IForgotPasswordRequest) {
  }
}

export class ForgotPasswordSuccess implements Action {
  public readonly type = AuthActionTypes.ForgotPasswordSuccess;
}

export class ForgotPasswordFailure implements Action {
  public readonly type = AuthActionTypes.ForgotPasswordFailure;

  constructor(public payload: any) {
  }
}

export class ForgotPasswordClean implements Action {
  public readonly type = AuthActionTypes.ForgotPasswordClean;

  constructor(public payload: any) {
  }
}

export class ResetPasswordRequest implements Action {
  public readonly type = AuthActionTypes.ResetPasswordRequest;

  constructor(public payload: {
    userId: string,
    code: string,
    password: string,
  }) {
  }
}

export class ResetPasswordSuccess implements Action {
  public readonly type = AuthActionTypes.ResetPasswordSuccess;

  constructor(public payload: { user: IUserDTO, token: string }) {
  }
}

export class ResetPasswordFailure implements Action {
  public readonly type = AuthActionTypes.ResetPasswordFailure;

  constructor(public payload: any) {
  }
}

export class ResetPasswordClean implements Action {
  public readonly type = AuthActionTypes.ResetPasswordClean;

  constructor(public payload: any) {
  }
}

export class SetPasswordRequest implements Action {
  public readonly type = AuthActionTypes.SetPasswordRequest;

  constructor(public payload: {
    userId: string,
    code: string,
    password: string,
    toSAccepted: boolean,
  }) {
  }
}

export class SetPasswordSuccess implements Action {
  public readonly type = AuthActionTypes.SetPasswordSuccess;

  constructor(public payload: { user: IUserDTO, token: string }) {
  }
}

export class SetPasswordFailure implements Action {
  public readonly type = AuthActionTypes.SetPasswordFailure;

  constructor(public payload: any) {
  }
}

export class SetPasswordClean implements Action {
  public readonly type = AuthActionTypes.SetPasswordClean;

  constructor(public payload: any) {
  }
}

export class OtpRedirectClean implements Action {
  public readonly type = AuthActionTypes.OtpRedirectClean;

  constructor(public payload: any) {
  }
}

export class MeRequestSuccess implements Action {
  public readonly type = AuthActionTypes.MeRequestSuccess;

  constructor(public payload: { user: IUserDTO }) {
  }
}

export type AuthActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginClean
  | LoginRedirect
  | Logout
  | ForgotPasswordRequest
  | ForgotPasswordSuccess
  | ForgotPasswordFailure
  | ForgotPasswordClean
  | ResetPasswordRequest
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | ResetPasswordClean
  | MeRequestSuccess
  | OtpRedirect
  | OtpLogin
  | OtpAuthClean
  | OtpRedirectClean;
