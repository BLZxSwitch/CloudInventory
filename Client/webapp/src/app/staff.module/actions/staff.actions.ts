import { Action } from "@ngrx/store";
import { EmployeeDTO } from "../../core/services/service-proxies";

export enum StaffActionTypes {
  EmployeeEdit = "[Staff] Edit Employee",
  EmployeeAdd = "[Staff] Add Employee",
  EmployeeDelete = "[Staff] Delete Employee",
  EmployeeSubmit = "[Staff] Submit Employee",
  EmployeeDialogClosed = "[Staff] Employee Dialog Closed",
  EmployeeSendInvitation = "[Staff] Employee Send Invitation",
}

export class EmployeeEdit implements Action {
  public readonly type = StaffActionTypes.EmployeeEdit;

  constructor(public payload: { employeeId: string }) {
  }
}

export class EmployeeSubmit implements Action {
  public readonly type = StaffActionTypes.EmployeeSubmit;

  constructor(public payload: { employee: EmployeeDTO, invite: boolean }) {
  }
}

export class EmployeeAdd implements Action {
  public readonly type = StaffActionTypes.EmployeeAdd;
}

export class EmployeeDelete implements Action {
  public readonly type = StaffActionTypes.EmployeeDelete;

  constructor(public payload: { employeeId: string }) {
  }
}

export class EmployeeDialogClosed implements Action {
  public readonly type = StaffActionTypes.EmployeeDialogClosed;
}

export class EmployeeSendInvitation implements Action {
  public readonly type = StaffActionTypes.EmployeeSendInvitation;

  constructor(public payload: { employee: EmployeeDTO }) {
  }
}

export type StaffActions = EmployeeEdit
  | EmployeeAdd
  | EmployeeDelete
  | EmployeeSubmit
  | EmployeeDialogClosed
  | EmployeeSendInvitation;
