import { EmployeesFilterActionsUnion, EmployeesFilterActionTypes } from "../actions/employees-filter.actions";

export interface IState {
  filterPattern: string;
}

const initialState: IState = {
  filterPattern: undefined,
};

export function reducer(state = initialState, action: EmployeesFilterActionsUnion) {

  switch (action.type) {

    case EmployeesFilterActionTypes.FilterChanged: {
      return {
        ...state,
        filterPattern: action.payload.filterPattern,
      };
    }

    default:
      return state;
  }
}

export const getFilterPattern = (state: IState) => state.filterPattern;
