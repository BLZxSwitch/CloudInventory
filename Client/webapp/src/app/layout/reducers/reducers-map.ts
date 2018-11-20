import { ActionReducerMap } from "@ngrx/store";
import { ILoadingIndicatorState } from "../store/loading-indicator.state";
import { loadingIndicatorCountReducer } from "./loading-indicator-count.reducer";
import { loadingIndicatorStateReducer } from "./loading-indicator-state.reducer";

export function reducers(): ActionReducerMap<ILoadingIndicatorState> {
  return {
    isVisible: loadingIndicatorStateReducer,
    loadingCount: loadingIndicatorCountReducer
  };
}
