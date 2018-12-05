import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { getAllOrgUnitsEntities, getOrgUnitEntities } from "../../data/reducers";
import * as fromRoot from "../../reducers";
import * as fromEntityUpsert from "../../shared/reducer-creators/entity-upsert.reducer-creator";
import { OrgUnitEdit, OrgUnitsActionTypes } from "../actions/org-units.actions";
import * as fromOrgUnitFilter from "../reducers/org-units-filter.reducer";

export interface IOrgUnitsState {
  orgUnits: fromEntityUpsert.IState;
  orgUnitsFilter: fromOrgUnitFilter.IState;
}

export const ORG_UNITS = "orgUnits";

export interface IOrgUnitsStore extends fromRoot.IState {
  orgUnits: IOrgUnitsState;
}

export function reducers(): ActionReducerMap<IOrgUnitsState> {
  return {
    orgUnits: fromEntityUpsert.createEntityUpsertReducer(
      [OrgUnitsActionTypes.OrgUnitEdit],
      OrgUnitsActionTypes.OrgUnitAdd,
      OrgUnitsActionTypes.OrgUnitDialogClosed,
      (action: OrgUnitEdit) => action.payload.orgUnit.id),
    orgUnitsFilter: fromOrgUnitFilter.reducer
  };
}

export const orgUnitsFeatureStateProjector = createFeatureSelector<IOrgUnitsState>(ORG_UNITS);

export const getOrgUnitsState = createSelector(
  orgUnitsFeatureStateProjector,
  state => state.orgUnits
);

export const getEditingOrgUnitId = createSelector(
  getOrgUnitsState,
  fromEntityUpsert.getEditingEntityId
);

export const getOrgUnitFilter = createSelector(
  orgUnitsFeatureStateProjector,
  (state: IOrgUnitsState) => state.orgUnitsFilter
);

export const getOrgUnitFilterName = createSelector(
  getOrgUnitFilter,
  fromOrgUnitFilter.getName,
);

export const getEditingOrgUnit = createSelector(
  getOrgUnitEntities,
  getEditingOrgUnitId,
  (entities, editingOrgUnitId) => entities[editingOrgUnitId]
);

// export const getActiveOrgUnits = createSelector(
//   getAllOrgUnitsEntities,
//   entities => entities.filter(({isActive}) => isActive)
// );

// import { ActionReducerMap, createFeatureSelector, createSelector, select } from "@ngrx/store";
// import { getAllOrgUnitsEntities, getOrgUnitEntities } from "../../data/reducers";
// import * as fromRoot from "../../reducers";
// import * as fromEntityUpsert from "../../shared/reducer-creators/entity-upsert.reducer-creator";
// import { OrgUnitEdit, OrgUnitsActionTypes } from "../actions/org-units.actions";
// import * as fromOrgUnitFilter from "../reducers/org-units-filter.reducer";
//
// export interface IOrgUnitsState {
//   orgUnits: fromEntityUpsert.IState;
//   orgUnitsFilter: fromOrgUnitFilter.IState;
// }
//
// export const ORG_UNITS = "orgUnits";
//
// export interface IOrgUnitsStore extends fromRoot.IState {
//   orgUnits: IOrgUnitsState;
// }
//
// export function reducers(): ActionReducerMap<IOrgUnitsState> {
//   return {
//     orgUnits: fromEntityUpsert.createEntityUpsertReducer(
//       [OrgUnitsActionTypes.OrgUnitEdit],
//       OrgUnitsActionTypes.OrgUnitAdd,
//       OrgUnitsActionTypes.OrgUnitDialogClosed,
//       (action: OrgUnitEdit) => action.payload.orgUnit.id),
//     orgUnitsFilter: fromOrgUnitFilter.reducer
//   };
// }
//
// export const orgUnitFeatureStateProjector = createFeatureSelector<IOrgUnitsState>(ORG_UNITS);
//
// export const getOrgUnitState = createSelector(
//   orgUnitFeatureStateProjector,
//   state => state.orgUnits
// );
//
// export const getEditingOrgUnitId = createSelector(
//   getOrgUnitState,
//   fromEntityUpsert.getEditingEntityId
// );
//
// export const getOrgUnitFilter = createSelector(
//   orgUnitFeatureStateProjector,
//   (state: IOrgUnitsState) => state.orgUnitsFilter
// );
//
// export const getOrgUnitFilterName = createSelector(
//   getOrgUnitFilter,
//   fromOrgUnitFilter.getName,
// );
//
// export const getEditingOrgUnit = createSelector(
//   getOrgUnitEntities,
//   getEditingOrgUnitId,
//   (entities, editingOrgUnitId) => entities[editingOrgUnitId]
// );
//
// export const getActiveOrgUnit = select(getAllOrgUnitsEntities);
//
// // export const getActiveOrgUnit = createSelector(
// //   getAllOrgUnitsEntities,
// //   entities => entities.filter(({isActive}) => isActive)
// // );
