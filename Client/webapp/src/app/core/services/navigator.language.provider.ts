import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NavigatorLanguageProvider {

  public get(): string {
    return navigator.language || (navigator as any).userLanguage;
  }
}
