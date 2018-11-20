import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { AsDescriptable } from "../../shared/descriptable/descriptable.decorator";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("USER_INACTIVE")
@AsDescriptable("FORM.API_ERROR.USER_INACTIVE")
export class UserInactiveError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
