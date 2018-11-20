import { LayoutActions, LayoutActionTypes } from "../actions/layout.actions";

export interface IState {
  showSidenav: boolean;
}

export const initialState: IState = {
  showSidenav: false
};

export function reducer(
  state: IState = initialState,
  action: LayoutActions
): IState {
  switch (action.type) {
    case LayoutActionTypes.SidenavClose:
      return {
        ...state,
        showSidenav: false,
      };

    case LayoutActionTypes.SidenavOpen:
      return {
        ...state,
        showSidenav: true,
      };

    default:
      return state;
  }
}

export const getShowSidenav = (state: IState) => state.showSidenav;
