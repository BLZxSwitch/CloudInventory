import { select } from "@ngrx/store";
import { pipe } from "rxjs";
import { otpErrorProjector } from "../projectors/otp-auth.error.projector";

export const otpErrorSelector = pipe(
  select(otpErrorProjector)
);
