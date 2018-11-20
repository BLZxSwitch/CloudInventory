import { DashboardActions, DashboardActionTypes } from "../actions/dashboard.actions";

export interface IState {
  hasOnlyAdminUsers: boolean;
}

const initialState: IState = {
  hasOnlyAdminUsers: undefined
};

export function reducer(state = initialState, action: DashboardActions) {

  switch (action.type) {

    case DashboardActionTypes.DashboardSummarySuccess: {
      const { hasOnlyAdminUsers } = action.payload.dashboardSummaryResponse;
      return {
        ...state,
        hasOnlyAdminUsers
      };
    }

    default:
      return state;
  }
}

export const getHasOnlyAdminUsers = (state: IState) => state.hasOnlyAdminUsers;
