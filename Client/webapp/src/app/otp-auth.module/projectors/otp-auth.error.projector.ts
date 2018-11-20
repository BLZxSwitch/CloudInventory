import { createSelector } from "@ngrx/store";
import { otpAuthFeatureProjector } from "./otp-auth.feature-projector";

export const otpErrorProjector = createSelector(
  otpAuthFeatureProjector,
  store => store.error
);
