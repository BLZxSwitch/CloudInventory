import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromEmployees from "../../data/reducers/employees.reducer";
import * as fromOrgUnits from "../../data/reducers/org-units-collection.reducer";
import * as fromRoot from "../../reducers";

export interface IDataState {
  employees: fromEmployees.IState;
  orgUnits: fromOrgUnits.IState;
}

export const DATA = "data";

export interface IState extends fromRoot.IState {
  data: IDataState;
}

export const reducers: ActionReducerMap<IDataState> = {
  employees: fromEmployees.reducer,
  orgUnits: fromOrgUnits.reducer
};

export const getDataFeatureState = createFeatureSelector<IDataState>(DATA);

export const getEmployeesEntitiesState = createSelector(
  getDataFeatureState,
  state => state.employees
);

export const getOrgUnitsState = createSelector(
  getDataFeatureState,
  state => state.orgUnits
);

export const {
  selectIds: getEmployeeIds,
  selectEntities: getEmployeeEntities,
  selectAll: getAllEmployees,
  selectTotal: getTotalEmployees
} = fromEmployees.adapter.getSelectors(getEmployeesEntitiesState);

export const {
  selectIds: getOrgUnitIds,
  selectEntities: getOrgUnitEntities,
  selectAll: getAllOrgUnitsEntities,
  selectTotal: getTotalOrgUnits
} = fromOrgUnits.adapter.getSelectors(getOrgUnitsState);
