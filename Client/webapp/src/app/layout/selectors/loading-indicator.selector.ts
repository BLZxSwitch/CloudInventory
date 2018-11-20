import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LOADING_INDICATOR_NAME } from "../loading-indicator.feature-name";
import { ILoadingIndicatorState } from "../store/loading-indicator.state";

export const selectLoadingIndicatorState = createFeatureSelector<ILoadingIndicatorState>(LOADING_INDICATOR_NAME);

export const getLoadingCount = (state: ILoadingIndicatorState) => state.loadingCount;

export const getIsVisible = (state: ILoadingIndicatorState) => state.isVisible;

export const selectLoadingIndicatorCount = createSelector(
  selectLoadingIndicatorState,
  getLoadingCount
);

export const selectLoadingIndicatorIsVisible = createSelector(
  selectLoadingIndicatorState,
  getIsVisible
);
