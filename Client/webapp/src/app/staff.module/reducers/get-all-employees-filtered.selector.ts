import { createSelector } from "@ngrx/store";
import * as fromData from "../../data/reducers";
import { getEmployeesFilterPattern } from "./index";

export const getAllEmployeesFilteredProjector = (entities, filterPattern) => entities
  .filter(
    ({lastName, firstName, ahvNr, fullName}) => !filterPattern
      || [lastName, firstName, ahvNr, fullName]
        .filter(value => !!value)
        .some(searchField => searchField.toLowerCase().includes(filterPattern.toLowerCase()))
  );

export const getAllEmployeesFilteredSelector = createSelector(
  fromData.getAllEmployees,
  getEmployeesFilterPattern,
  getAllEmployeesFilteredProjector,
);
