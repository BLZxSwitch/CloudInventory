import {
  HttpLoadingIndicatorActionsUnion,
  HttpLoadingIndicatorTypes
} from "../../core/actions/htpp-loading-indicator.actions";

export function loadingIndicatorCountReducer(
  state = 0,
  action: HttpLoadingIndicatorActionsUnion
): number {
  switch (action.type) {
    case HttpLoadingIndicatorTypes.HttpStarted:
      return state + 1;

    case HttpLoadingIndicatorTypes.HttpFinalized:
      return state - 1;

    default:
      return state;
  }
}
