import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { AsDescriptable } from "../../shared/descriptable/descriptable.decorator";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("OTP_INVALID_REQUEST")
@AsDescriptable("FORM.API_ERROR.INVALID_REQUEST")
export class InvalidRequestError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
