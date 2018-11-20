import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { AsDescriptable } from "../../shared/descriptable/descriptable.decorator";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("INVALID_OTP_CODE")
@AsDescriptable("FORM.API_ERROR.OTP_CODE_IS_INVALID")
export class InvalidOtpCodeError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
