import { Action } from "@ngrx/store";

export interface IState {
  pending: boolean;
}

export const initialState: IState = {
  pending: false,
};

export const createUpsertDialogReducer = (requestActions: string[], requestResultActions: string[]) =>
  (state = initialState, action: Action): IState => {
    if (requestActions.includes(action.type)) {
      return {
        ...state,
        pending: true,
      };
    }

    if (requestResultActions.includes(action.type)) {
      return {
        ...state,
        pending: false,
      };
    }

    return state;

  };

export const getPendingState = (state: IState) => state.pending;
