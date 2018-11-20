import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NavigatorWebApiProvider {

  public get(): NavigatorOnLine {
    return navigator;
  }
}
