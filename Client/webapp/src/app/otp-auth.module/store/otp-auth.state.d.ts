import { IOtpGetLinkResponse } from "../../core/services/service-proxies";

export interface IOtpAuthState {
  otpLink: IOtpGetLinkResponse;
  error: string | undefined;
}
