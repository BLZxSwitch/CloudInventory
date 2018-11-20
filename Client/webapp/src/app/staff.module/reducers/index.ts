import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeesActionTypes } from "../../data/actions/employees.actions";
import * as fromData from "../../data/reducers";
import * as fromRoot from "../../reducers";
import * as fromEntityUpsert from "../../shared/reducer-creators/entity-upsert.reducer-creator";
import * as fromUpsertDialog from "../../shared/reducer-creators/upsert-dialog.reducer-creator";
import { EmployeeEdit, StaffActionTypes } from "../actions/staff.actions";
import { STAFF_FEATURE_NAME } from "../staff.feature-name";
import * as fromEmployeesFilter from "./employees-filter.reducer";

export interface IStaffState {
  staff: fromEntityUpsert.IState;
  employeeInfoDialog: fromUpsertDialog.IState;
  employeesFilter: fromEmployeesFilter.IState;
}

export interface IState extends fromRoot.IState {
  staff: IStaffState;
}

export function reducers(): ActionReducerMap<IStaffState> {
  return {
    staff: fromEntityUpsert.createEntityUpsertReducer([StaffActionTypes.EmployeeEdit],
      StaffActionTypes.EmployeeAdd,
      StaffActionTypes.EmployeeDialogClosed,
      (action: EmployeeEdit) => action.payload.employeeId),
    employeeInfoDialog: fromUpsertDialog.createUpsertDialogReducer([
        EmployeesActionTypes.EmployeeAddRequest,
        EmployeesActionTypes.EmployeeEditRequest,
        EmployeesActionTypes.EmployeeSendInvitationRequest,
        EmployeesActionTypes.EmployeeInviteAfterAddRequest],
      [EmployeesActionTypes.EmployeeEditSuccess,
        EmployeesActionTypes.EmployeeAddAndSendInvitationSuccess,
        EmployeesActionTypes.EmployeeAddSuccess,
        EmployeesActionTypes.EmployeeSendInvitationSuccess,
        EmployeesActionTypes.EmployeeAddFailure,
        EmployeesActionTypes.EmployeeEditFailure,
        EmployeesActionTypes.EmployeeSendInvitationFailure]),
    employeesFilter: fromEmployeesFilter.reducer,
  };
}

export const getStaffFeatureState = createFeatureSelector<IStaffState>(STAFF_FEATURE_NAME);

export const getEmployeesFilterState = createSelector(
  getStaffFeatureState,
  state => state.employeesFilter
);

export const getEmployeesFilterPattern = createSelector(
  getEmployeesFilterState,
  fromEmployeesFilter.getFilterPattern
);

export const getStaffState = createSelector(
  getStaffFeatureState,
  state => state.staff
);

export const getEmployeeInfoDialogState = createSelector(
  getStaffFeatureState,
  state => state.employeeInfoDialog
);

export const getEditingEmployeeId = createSelector(
  getStaffState,
  fromEntityUpsert.getEditingEntityId
);

export const getEditingEmployee = createSelector(
  fromData.getEmployeeEntities,
  getEditingEmployeeId,
  (entities, editingEmployeeId) => entities[editingEmployeeId]
);

export const getEmployeeInfoDialogPendingState = createSelector(
  getEmployeeInfoDialogState,
  fromUpsertDialog.getPendingState,
);
