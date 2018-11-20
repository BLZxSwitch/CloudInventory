import { select } from "@ngrx/store";
import { pipe } from "rxjs";
import { take } from "rxjs/operators";
import { otpLinkProjector } from "../projectors/otp-auth.otp-link.projector";

export const otpLinkSelector = pipe(
  select(otpLinkProjector),
  take(1)
);
