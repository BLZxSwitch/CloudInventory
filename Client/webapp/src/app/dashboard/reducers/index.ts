import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRoot from "../../reducers";
import * as fromDashboard from "./dashboard.reducer";

export const DASHBOARD = "dashboard";

export interface IDashboardState {
  dashboard: fromDashboard.IState;
}

export interface IState extends fromRoot.IState {
  dashboard: IDashboardState;
}

export function reducers(): ActionReducerMap<IDashboardState> {
  return {
    dashboard: fromDashboard.reducer,
  };
}

export const getDashboardFeatureState = createFeatureSelector<IDashboardState>(DASHBOARD);

export const getDashboardState = createSelector(
  getDashboardFeatureState,
  state => state.dashboard
);

export const getHasOnlyAdminUsers = createSelector(
  getDashboardState,
  fromDashboard.getHasOnlyAdminUsers
);
