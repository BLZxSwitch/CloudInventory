import { Injectable } from "@angular/core";
import { NavigatorLanguageProvider } from "./navigator.language.provider";

@Injectable({
  providedIn: "root"
})
export class IntlNumberFormattingProvider {
  constructor(private navigatorLanguageProvider: NavigatorLanguageProvider) {
  }

  public format(value: number, options?: Intl.NumberFormatOptions): string {
    return Intl.NumberFormat(this.navigatorLanguageProvider.get(), options)
      .format(value);
  }

  public formatCurrency(value: number): string {
    if (!value) {
      return undefined;
    }
    return this.format(value, {
      style: "currency",
      currency: "CHF"
    });
  }

  public formatPercent(value: number): string {
    if (value === undefined) {
      return undefined;
    }
    return this.format(value, {
      style: "percent",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
}
