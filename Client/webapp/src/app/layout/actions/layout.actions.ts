import { Action } from "@ngrx/store";

export enum LayoutActionTypes {
  SidenavClose = "[Layout] Sidenav Close",
  SidenavOpen = "[Layout] Sidenav Open",
}

export class SidenavClose implements Action {
  public readonly type = LayoutActionTypes.SidenavClose;
}

export class SidenavOpen implements Action {
  public readonly type = LayoutActionTypes.SidenavOpen;
}

export type LayoutActions = SidenavClose
  | SidenavOpen;
