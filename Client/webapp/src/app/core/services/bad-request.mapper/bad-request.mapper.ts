import { Injectable } from "@angular/core";
import { get } from "../../../shared/map-to-bad-requests/map-to-bad-request.registrations";
import { UnspecifiedBadRequestError } from "../../errors/unspecified-bad-request.error";

@Injectable({
  providedIn: "root"
})
export class BadRequestMapper {

  public get(key: string): any {
    for (const info of get()) {
      if (info.key === key) {
        return new info.type();
      }
    }
    return new UnspecifiedBadRequestError();
  }
}
