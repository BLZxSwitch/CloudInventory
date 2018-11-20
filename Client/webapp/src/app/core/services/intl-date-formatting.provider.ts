import { Injectable } from "@angular/core";
import { Moment } from "moment";
import { NavigatorLanguageProvider } from "./navigator.language.provider";

@Injectable({
  providedIn: "root"
})
export class IntlDateFormattingProvider {
  constructor(private navigatorLanguageProvider: NavigatorLanguageProvider) {
  }

  public format(value: Moment): string {
    if (!value) {
      return undefined;
    }
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    };
    return Intl.DateTimeFormat(this.navigatorLanguageProvider.get(), options)
      .format(value.toDate());
  }
}
