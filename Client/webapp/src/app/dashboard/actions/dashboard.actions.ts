import { Action } from "@ngrx/store";
import { DashboardSummaryResponse } from "../../core/services/service-proxies";

export enum DashboardActionTypes {
  DashboardSummaryRequest = "[Dashboard] Summary Request",
  DashboardSummarySuccess = "[Dashboard] Summary Success",
  DashboardSummaryFailure = "[Dashboard] Summary Failure",
}

export class DashboardSummaryRequest implements Action {
  public readonly type = DashboardActionTypes.DashboardSummaryRequest;
}

export class DashboardSummarySuccess implements Action {
  public readonly type = DashboardActionTypes.DashboardSummarySuccess;

  constructor(public payload: { dashboardSummaryResponse: DashboardSummaryResponse }) {
  }
}

export class DashboardSummaryFailure implements Action {
  public readonly type = DashboardActionTypes.DashboardSummaryFailure;

  constructor(public payload: any) {
  }
}

export type DashboardActions = DashboardSummaryRequest
  | DashboardSummarySuccess
  | DashboardSummaryFailure;
