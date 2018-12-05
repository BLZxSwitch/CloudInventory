import { Action } from "@ngrx/store";
import { IOrgUnitDTO } from "../../core/services/service-proxies";

export enum OrgUnitsActionTypes {
  OrgUnitAdd = "[OrgUnits] Add",
  OrgUnitEdit = "[OrgUnits] Edit",
  OrgUnitDelete = "[OrgUnits] Delete",
  OrgUnitSubmit = "[OrgUnits] OrgUnit Submit",
  OrgUnitDialogClosed = "[OrgUnits] OrgUnit Dialog Closed",
}

export class OrgUnitAdd implements Action {
  public readonly type = OrgUnitsActionTypes.OrgUnitAdd;
}

export class OrgUnitEdit implements Action {
  public readonly type = OrgUnitsActionTypes.OrgUnitEdit;

  constructor(public payload: { orgUnit: IOrgUnitDTO }) {
  }
}

export class OrgUnitDelete implements Action {
  public readonly type = OrgUnitsActionTypes.OrgUnitDelete;

  constructor(public payload: { orgUnitId: string }) {
  }
}

export class OrgUnitSubmit implements Action {
  public readonly type = OrgUnitsActionTypes.OrgUnitSubmit;

  constructor(public payload: { orgUnit: IOrgUnitDTO }) {
  }
}

export class OrgUnitDialogClosed implements Action {
  public readonly type = OrgUnitsActionTypes.OrgUnitDialogClosed;
}

// export type OrgUnitsActionsUnion = OrgUnitAdd
//   | OrgUnitEdit
//   | OrgUnitDelete
//   | OrgUnitSubmit
//   | OrgUnitDialogClosed;
