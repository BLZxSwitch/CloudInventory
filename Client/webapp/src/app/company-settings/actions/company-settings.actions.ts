import { Action } from "@ngrx/store";
import { TenantSettingsDTO } from "../../core/services/service-proxies";

export enum CompanySettingsActionTypes {
  CompanySettingsLoad = "[Company Settings] Company Settings Load",
  CompanySettingsLoadSuccess = "[Company Settings] Company Settings Load Success",
  CompanySettingsLoadFailure = "[Company Settings] Company Settings Load Failure",
  CompanySettingsEditRequest = "[Company Settings] Company Settings Edit Request Action",
  CompanySettingsEditSuccess = "[Company Settings] Company Settings Edit Success Action",
  CompanySettingsEditFailure = "[Company Settings] Company Settings Edit Failure Action",
}

export class CompanySettingsLoad implements Action {
  public readonly type = CompanySettingsActionTypes.CompanySettingsLoad;
}

export class CompanySettingsLoadSuccess implements Action {
  public readonly type = CompanySettingsActionTypes.CompanySettingsLoadSuccess;

  constructor(public payload: { tenantSettings: TenantSettingsDTO }) {
  }
}

export class CompanySettingsLoadFailure implements Action {
  public readonly type = CompanySettingsActionTypes.CompanySettingsLoadFailure;

  constructor(public payload: any) {
  }
}

export class CompanySettingsEditRequest implements Action {
  public readonly type = CompanySettingsActionTypes.CompanySettingsEditRequest;

  constructor(public payload: { tenantSettings: TenantSettingsDTO }) {
  }
}

export class CompanySettingsEditSuccess implements Action {
  public readonly type = CompanySettingsActionTypes.CompanySettingsEditSuccess;

  constructor(public payload: { tenantSettings: TenantSettingsDTO }) {
  }
}

export class CompanySettingsEditFailure implements Action {
  public readonly type = CompanySettingsActionTypes.CompanySettingsEditFailure;

  constructor(public payload: any) {
  }
}

export type CompanySettingsActionsUnion =
  | CompanySettingsLoad
  | CompanySettingsLoadSuccess
  | CompanySettingsLoadFailure
  | CompanySettingsEditRequest
  | CompanySettingsEditSuccess
  | CompanySettingsEditFailure;
