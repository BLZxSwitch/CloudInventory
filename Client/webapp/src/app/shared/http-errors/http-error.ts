import { HttpErrorResponse } from "@angular/common/http";

export abstract class HttpError {
  constructor(public response: HttpErrorResponse) {

  }
}
