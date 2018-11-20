import { createSelector } from "@ngrx/store";
import { authFailedStateProjector } from "../../auth/projectors/auth.failed-state.projector";
import { IAuthFailedState } from "../../auth/store/auth-failed.state";

export const authFailedCountSelector = createSelector(
  authFailedStateProjector,
  (state: IAuthFailedState) => state.failedCount
);
