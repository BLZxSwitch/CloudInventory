import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("INVALID_OTP_TOKEN")
export class InvalidOtpTokenError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
