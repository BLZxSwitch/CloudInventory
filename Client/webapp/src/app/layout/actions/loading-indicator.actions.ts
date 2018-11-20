import { Action } from "@ngrx/store";

export enum LoadingIndicatorActionTypes {
  LoadingIndicatorShowAction = "[Loading Indicator] Show",
  LoadingIndicatorHideAction = "[Loading Indicator] Hide",
}

export class LoadingIndicatorShow implements Action {
  public readonly type = LoadingIndicatorActionTypes.LoadingIndicatorShowAction;
}

export class LoadingIndicatorHide implements Action {
  public readonly type = LoadingIndicatorActionTypes.LoadingIndicatorHideAction;
}

export type LoadingIndicatorActions = LoadingIndicatorShow | LoadingIndicatorHide;
