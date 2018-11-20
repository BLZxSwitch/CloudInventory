import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WindowProvider {

  public getInstance(): Window {
    return window;
  }

  public confirm(message?: string): boolean {
    return window.confirm(message);
  }
}
