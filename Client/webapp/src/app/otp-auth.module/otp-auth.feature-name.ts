import { nameof } from "../shared/nameof";
import { IOtpAuthStore } from "./store/otp-auth.store";

export const OTP_AUTH_FEATURE_NAME = nameof<IOtpAuthStore>("otpAuth");
