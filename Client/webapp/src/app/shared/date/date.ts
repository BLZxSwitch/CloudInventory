import { Moment, utc } from "moment";

export function date(milliseconds: number): Moment {
  return utc(milliseconds);
}
