import { HttpErrorResponse } from "@angular/common/http";
import { AsDescriptable } from "../descriptable/descriptable.decorator";
import { HttpError } from "./http-error";

@AsDescriptable("HTTP_ERRORS.INTERNAL_SERVER_ERROR")
export class HttpInternalServerError extends HttpError {
  constructor(public response: HttpErrorResponse) {
    super(response);
  }
}
