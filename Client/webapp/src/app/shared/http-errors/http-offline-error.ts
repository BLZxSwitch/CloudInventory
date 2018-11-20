import { HttpErrorResponse } from "@angular/common/http";
import { AsDescriptable } from "../descriptable/descriptable.decorator";
import { HttpError } from "./http-error";

@AsDescriptable("HTTP_ERRORS.OFFLINE_ERROR")
export class HttpOfflineError extends HttpError {
  constructor(public response: HttpErrorResponse) {
    super(response);
  }
}
