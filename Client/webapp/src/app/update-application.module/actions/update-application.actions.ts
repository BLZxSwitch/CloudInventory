import { Action } from "@ngrx/store";

export enum UpdateApplicationActionTypes {
  ReloadApplicationAction = "[Update Application] Reload application",
}

export class ReloadApplicationAction implements Action {
  public readonly type = UpdateApplicationActionTypes.ReloadApplicationAction;
}
