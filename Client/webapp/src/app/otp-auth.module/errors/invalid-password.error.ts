import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { AsDescriptable } from "../../shared/descriptable/descriptable.decorator";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("INVALID_PASSWORD")
@AsDescriptable("FORM.API_ERROR.PASSWORD_IS_INVALID")
export class InvalidPasswordError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
