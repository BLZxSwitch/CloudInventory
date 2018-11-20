import {Action} from "@ngrx/store";

export enum AppActionTypes {
  AuthProtectedRouteActivated = "[App] Auth Protected Route Activated"
}

export class AuthProtectedRouteActivated implements Action {
  public readonly type = AppActionTypes.AuthProtectedRouteActivated;
}

export type AppActionsUnion = AuthProtectedRouteActivated;
