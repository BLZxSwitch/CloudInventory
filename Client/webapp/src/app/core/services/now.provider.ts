import { Injectable } from "@angular/core";
import { Moment, utc } from "moment";
import { now } from "../../shared/date/now";

@Injectable({
  providedIn: "root"
})
export class NowProvider {
  public now(): Moment {
    return utc(now());
  }
}
