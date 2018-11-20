import { createSelector } from "@ngrx/store";
import { IAuthState, selectAuthState } from "../reducers";

export const authFailedStateProjector = createSelector(
  selectAuthState,
  (state: IAuthState) => state.authFailed
);
