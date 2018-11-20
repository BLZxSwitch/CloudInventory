import { createSelector } from "@ngrx/store";
import { Selector } from "@ngrx/store/src/models";

export interface IState {
  pending: boolean;
  error: any;
}

export const initialState: IState = {
  error: undefined,
  pending: false
};

export const createBasicPageReducer = (
  request: string,
  success: string,
  failure: string,
  clean: string) =>
  (state: IState = initialState, action) => {
    switch (action.type) {
      case request: {
        return {
          ...state,
          error: undefined,
          pending: true
        };
      }

      case success: {
        return {
          ...state,
          error: undefined,
          pending: false
        };
      }

      case failure: {
        return {
          ...state,
          error: action.payload,
          pending: false
        };
      }

      case clean: {
        return {
          ...state,
          error: undefined,
          pending: false
        };
      }
      default:
        return state;
    }
  };

export const getError = (state: IState) => state.error;
export const getPending = (state: IState) => state.pending;

export function getSelectors<State, Result>(selectState: Selector<State, IState>): {
  getPageError: Selector<State, any>,
  getPagePending: Selector<State, boolean>,
} {
  return {
    getPageError: createSelector(
      selectState,
      getError
    ), getPagePending: createSelector(
      selectState,
      getPending
    )
  };
}
