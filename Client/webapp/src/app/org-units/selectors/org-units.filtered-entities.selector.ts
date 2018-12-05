import { createSelector, select } from "@ngrx/store";
import { getAllOrgUnitsEntities } from "../../data/reducers";
import { getOrgUnitFilterName } from "../reducers";

export const orgUnitsFilteredEntitiesSelector = select(createSelector(
  getAllOrgUnitsEntities,
  getOrgUnitFilterName,
  (entities, name) => entities.filter(entity => !name || entity.name.toLowerCase().includes(name))));
