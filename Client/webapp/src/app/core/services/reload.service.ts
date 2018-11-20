import { Injectable } from "@angular/core";
import { WindowProvider } from "./window-provider.provider";

@Injectable({
  providedIn: "root"
})
export class ReloadService {

  constructor(private windowProvider: WindowProvider) {
  }

  public reload() {
    this.windowProvider.getInstance().location.reload();
  }
}
