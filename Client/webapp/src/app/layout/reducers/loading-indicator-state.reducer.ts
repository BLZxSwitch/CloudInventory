import { Action } from "@ngrx/store";
import { LoadingIndicatorActionTypes, LoadingIndicatorShow } from "../actions/loading-indicator.actions";

export function loadingIndicatorStateReducer(state = false, action: Action): boolean {
  switch (action.type) {
    case LoadingIndicatorActionTypes.LoadingIndicatorShowAction:
      return true;

    case LoadingIndicatorActionTypes.LoadingIndicatorHideAction:
      return false;

    default:
      return state;
  }
}
