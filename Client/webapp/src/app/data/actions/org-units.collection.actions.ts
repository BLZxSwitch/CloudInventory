import { Action } from "@ngrx/store";
import { OrgUnitDTO, OrgUnitRequestDTO, OrgUnitResponseDTO } from "../../core/services/service-proxies";

export enum OrgUnitsCollectionActionTypes {
  OrgUnitsLoad = "[Org Units] Org Units Load",
  OrgUnitsLoadSuccess = "[Org Units] Org Units Load Success",
  OrgUnitsLoadFailure = "[Org Units] Org Units Load Failure",
  OrgUnitEditRequest = "[Org Units] Org Unit Edit Request Action",
  OrgUnitEditSuccess = "[Org Units] Org Unit Edit Success Action",
  OrgUnitEditFailure = "[Org Units] Org Unit Edit Failure Action",
  OrgUnitAddRequest = "[Org Units] Org Unit Add Request Action",
  OrgUnitAddSuccess = "[Org Units] Org Unit Add Success Action",
  OrgUnitAddFailure = "[Org Units] Org Unit Add Failure Action",
  OrgUnitDeleteRequest = "[Org Units] Org Unit Delete Request Action",
  OrgUnitDeleteSuccess = "[Org Units] Org Unit Delete Success Action",
  OrgUnitDeleteFailure = "[Org Units] Org Unit Delete Failure Action",
}

export class OrgUnitsLoad implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitsLoad;
}

export class OrgUnitsLoadSuccess implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitsLoadSuccess;

  constructor(public payload: { orgUnits: OrgUnitResponseDTO[] }) {
  }
}

export class OrgUnitsLoadFailure implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitsLoadFailure;

  constructor(public payload: any) {
  }
}

export class OrgUnitEditRequest implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitEditRequest;

  constructor(public payload: { orgUnit: OrgUnitRequestDTO }) {
  }
}

export class OrgUnitEditSuccess implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitEditSuccess;

  constructor(public payload: { orgUnit: OrgUnitResponseDTO }) {
  }
}

export class OrgUnitEditFailure implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitEditFailure;

  constructor(public payload: any) {
  }
}

export class OrgUnitAddRequest implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitAddRequest;

  constructor(public payload: { orgUnit: OrgUnitRequestDTO }) {
  }
}

export class OrgUnitAddSuccess implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitAddSuccess;

  constructor(public payload: { orgUnit: OrgUnitResponseDTO }) {
  }
}

export class OrgUnitAddFailure implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitAddFailure;

  constructor(public payload: any) {
  }
}

export class OrgUnitDeleteRequest implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitDeleteRequest;

  constructor(public payload: { orgUnitId: string }) {
  }
}

export class OrgUnitDeleteSuccess implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitDeleteSuccess;

  constructor(public payload: { orgUnitId: string }) {
  }
}

export class OrgUnitDeleteFailure implements Action {
  public readonly type = OrgUnitsCollectionActionTypes.OrgUnitDeleteFailure;

  constructor(public payload: any) {
  }
}

export type OrgUnitsCollectionActionsUnion = OrgUnitsLoad
  | OrgUnitsLoadSuccess
  | OrgUnitsLoadFailure
  | OrgUnitEditRequest
  | OrgUnitEditSuccess
  | OrgUnitEditFailure
  | OrgUnitAddRequest
  | OrgUnitAddSuccess
  | OrgUnitAddFailure
  | OrgUnitDeleteRequest
  | OrgUnitDeleteSuccess
  | OrgUnitDeleteFailure;
