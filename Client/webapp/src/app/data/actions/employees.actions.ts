import { Action } from "@ngrx/store";
import { EmployeeDTO } from "../../core/services/service-proxies";

export enum EmployeesActionTypes {
  EmployeesLoad = "[Employees] EmployeesLoad",
  EmployeesLoadSuccess = "[Employees] EmployeesLoadSuccess",
  EmployeesLoadFail = "[Employees] EmployeesLoadFail",
  EmployeeEditRequest = "[Staff] Employee Edit Request Action",
  EmployeeEditSuccess = "[Staff] Employee Edit Success Action",
  EmployeeEditFailure = "[Staff] Employee Edit Failure Action",
  EmployeeAddRequest = "[Staff] Employee Add Request Action",
  EmployeeAddSuccess = "[Staff] Employee Add Success Action",
  EmployeeInviteAfterAddRequest = "[Staff] Employee Invite After Add Request",
  EmployeeAddFailure = "[Staff] Employee Add Failure Action",
  EmployeeSendInvitationRequest = "[Staff] Employee Send Invitation Request Action",
  EmployeeSendInvitationSuccess = "[Staff] Employee Send Invitation Success Action",
  EmployeeSendInvitationFailure = "[Staff] Employee Send Invitation Failure Action",
  EmployeeAddAndSendInvitationSuccess = "[Staff] Employee Add And Send Invitation Success Action",
  EmployeeDeleteRequest = "[Staff] Employee Delete Request Action",
  EmployeeDeleteSuccess = "[Staff] Employee Delete Success Action",
  EmployeeDeleteFailure = "[Staff] Employee Delete Failure Action",
}

export class EmployeesLoad implements Action {
  public readonly type = EmployeesActionTypes.EmployeesLoad;
}

export class EmployeesLoadSuccess implements Action {
  public readonly type = EmployeesActionTypes.EmployeesLoadSuccess;

  constructor(public payload: { employees: EmployeeDTO[] }) {
  }
}

export class EmployeesLoadFailure implements Action {
  public readonly type = EmployeesActionTypes.EmployeesLoadFail;

  constructor(public payload: any) {
  }
}

export class EmployeeEditRequest implements Action {
  public readonly type = EmployeesActionTypes.EmployeeEditRequest;

  constructor(public payload: { employee: EmployeeDTO }) {
  }
}

export class EmployeeAddRequest implements Action {
  public readonly type = EmployeesActionTypes.EmployeeAddRequest;

  constructor(public payload: { employee: EmployeeDTO, invite: boolean }) {
  }
}

export class EmployeeEditSuccess implements Action {
  public readonly type = EmployeesActionTypes.EmployeeEditSuccess;

  constructor(public payload: { employee: EmployeeDTO }) {
  }
}

export class EmployeeEditFailure implements Action {
  public readonly type = EmployeesActionTypes.EmployeeEditFailure;

  constructor(public payload: any) {
  }
}

export class EmployeeAddSuccess implements Action {
  public readonly type = EmployeesActionTypes.EmployeeAddSuccess;

  constructor(public payload: { employee: EmployeeDTO }) {
  }
}

export class EmployeeInviteAfterAddRequest implements Action {
  public readonly type = EmployeesActionTypes.EmployeeInviteAfterAddRequest;

  constructor(public payload: { employee: EmployeeDTO }) {
  }
}

export class EmployeeAddFailure implements Action {
  public readonly type = EmployeesActionTypes.EmployeeAddFailure;

  constructor(public payload: any) {
  }
}

export class EmployeeSendInvitationRequest implements Action {
  public readonly type = EmployeesActionTypes.EmployeeSendInvitationRequest;

  constructor(public payload: { employee: EmployeeDTO }) {
  }
}

export class EmployeeSendInvitationFailure implements Action {
  public readonly type = EmployeesActionTypes.EmployeeSendInvitationFailure;

  constructor(public payload: any) {
  }
}

export class EmployeeSendInvitationSuccess implements Action {
  public readonly type = EmployeesActionTypes.EmployeeSendInvitationSuccess;

  constructor(public payload: any) {
  }
}

export class EmployeeAddAndSendInvitationSuccess implements Action {
  public readonly type = EmployeesActionTypes.EmployeeAddAndSendInvitationSuccess;

  constructor(public payload: any) {
  }
}

export class EmployeeDeleteRequest implements Action {
  public readonly type = EmployeesActionTypes.EmployeeDeleteRequest;

  constructor(public payload: { employeeId: string }) {
  }
}

export class EmployeeDeleteSuccess implements Action {
  public readonly type = EmployeesActionTypes.EmployeeDeleteSuccess;

  constructor(public payload: { employeeId: string }) {
  }
}

export class EmployeeDeleteFailure implements Action {
  public readonly type = EmployeesActionTypes.EmployeeDeleteFailure;

  constructor(public payload: any) {
  }
}

export type EmployeesActionsUnion = EmployeesLoad
  | EmployeesLoadSuccess
  | EmployeesLoadFailure
  | EmployeeAddRequest
  | EmployeeAddSuccess
  | EmployeeAddFailure
  | EmployeeEditRequest
  | EmployeeEditSuccess
  | EmployeeEditFailure
  | EmployeeDeleteRequest
  | EmployeeDeleteSuccess
  | EmployeeDeleteFailure
  | EmployeeSendInvitationRequest
  | EmployeeSendInvitationFailure
  | EmployeeSendInvitationSuccess
  | EmployeeAddAndSendInvitationSuccess
  | EmployeeInviteAfterAddRequest;
