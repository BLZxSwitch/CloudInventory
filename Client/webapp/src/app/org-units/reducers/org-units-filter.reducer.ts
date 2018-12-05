import { OrgUnitsFilterChanged } from "../actions/org-units-filter.actions";

export interface IState {
  name: string;
}

const initialState: IState = {
  name: undefined
};

export function reducer(state = initialState, action: OrgUnitsFilterChanged) {

  switch (action.type) {

    case OrgUnitsFilterChanged.type: {
      const {name} = action.payload;
      return {
        ...state,
        name
      };
    }

    default:
      return state;
  }
}

export const getName = (state: IState) => state.name;
