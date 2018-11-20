import { Action } from "@ngrx/store";

export enum EmployeesFilterActionTypes {
  FilterChanged = "[Employee] Filter Changed",
}

export class EmployeesFilterChanged implements Action {
  public readonly type = EmployeesFilterActionTypes.FilterChanged;

  constructor(public payload: {
    filterPattern: string;
  }) {
  }
}

export type EmployeesFilterActionsUnion = EmployeesFilterChanged;
