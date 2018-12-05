import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { IOrgUnitRequestDTO, IOrgUnitResponseDTO } from "../../core/services/service-proxies";
import { OrgUnitsCollectionActionsUnion, OrgUnitsCollectionActionTypes } from "../actions/org-units.collection.actions";

export interface IState extends EntityState<IOrgUnitResponseDTO> {

}

export const adapter: EntityAdapter<IOrgUnitResponseDTO> = createEntityAdapter<IOrgUnitResponseDTO>({
  selectId: (orgUnit: IOrgUnitResponseDTO) => orgUnit.id,
  sortComparer: false,
});

export const initialState: IState = adapter.getInitialState();

export function reducer(state = initialState, action: OrgUnitsCollectionActionsUnion): IState {
  switch (action.type) {

    case OrgUnitsCollectionActionTypes.OrgUnitsLoadSuccess: {
      return adapter.upsertMany(action.payload.orgUnits, {
        ...state
      });
    }

    case OrgUnitsCollectionActionTypes.OrgUnitAddSuccess: {
      return adapter.addOne(action.payload.orgUnit, {
        ...state
      });
    }

    case OrgUnitsCollectionActionTypes.OrgUnitEditSuccess: {
      return adapter.updateOne({
        id: action.payload.orgUnit.id,
        changes: action.payload.orgUnit
      }, {
        ...state
      });
    }

    case OrgUnitsCollectionActionTypes.OrgUnitDeleteSuccess: {
      return adapter.removeOne(action.payload.orgUnitId, {
        ...state
      });
    }

    default:
      return state;
  }
}
