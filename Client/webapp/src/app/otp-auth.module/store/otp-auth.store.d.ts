import { IState } from "../../data/reducers";
import { IOtpAuthState } from "./otp-auth.state";

export interface IOtpAuthStore extends IState {
  otpAuth: IOtpAuthState;
}
