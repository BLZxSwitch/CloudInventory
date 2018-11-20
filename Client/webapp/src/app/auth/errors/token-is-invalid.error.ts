import { HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { AsDescriptable } from "../../shared/descriptable/descriptable.decorator";
import { MapToBadRequest } from "../../shared/map-to-bad-requests/map-to-bad-request.decorator";

@MapToBadRequest("TOKEN_IS_INVALID")
@AsDescriptable("FORM.API_ERROR.TOKEN_IS_INVALID")
export class TokenIsInvalidError {
  constructor(public request: HttpRequest<any>,
              public response: HttpErrorResponse) {
  }
}
