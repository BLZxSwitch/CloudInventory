import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Guid {
  public static readonly Empty = "{00000000-0000-0000-0000-000000000000}";

  public empty(): string {
    return Guid.Empty;
  }
}
