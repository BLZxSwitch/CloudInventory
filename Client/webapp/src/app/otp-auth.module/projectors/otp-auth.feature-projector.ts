import { createFeatureSelector } from "@ngrx/store";
import { OTP_AUTH_FEATURE_NAME } from "../otp-auth.feature-name";
import { IOtpAuthState } from "../store/otp-auth.state";

export const otpAuthFeatureProjector =
  createFeatureSelector<IOtpAuthState>(OTP_AUTH_FEATURE_NAME);
