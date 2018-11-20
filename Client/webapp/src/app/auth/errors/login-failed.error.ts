import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { AsDescriptable } from "../../shared/descriptable/descriptable.decorator";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("LOGIN_FAILED")
@AsDescriptable("FORM.API_ERROR.LOGIN_FAILED")
export class LoginFailedError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
