import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromEmployees from "../../data/reducers/employees.reducer";
import * as fromRoot from "../../reducers";

export interface IDataState {
  employees: fromEmployees.IState;
}

export const DATA = "data";

export interface IState extends fromRoot.IState {
  data: IDataState;
}

export const reducers: ActionReducerMap<IDataState> = {
  employees: fromEmployees.reducer
};

export const getDataFeatureState = createFeatureSelector<IDataState>(DATA);

export const getEmployeesEntitiesState = createSelector(
  getDataFeatureState,
  state => state.employees
);

export const {
  selectIds: getEmployeeIds,
  selectEntities: getEmployeeEntities,
  selectAll: getAllEmployees,
  selectTotal: getTotalEmployees
} = fromEmployees.adapter.getSelectors(getEmployeesEntitiesState);
