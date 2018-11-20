import { createSelector } from "@ngrx/store";
import { otpAuthFeatureProjector } from "./otp-auth.feature-projector";

export const otpLinkProjector = createSelector(
  otpAuthFeatureProjector,
  store => store.otpLink
);
