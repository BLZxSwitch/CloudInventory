import { Pipe, PipeTransform } from "@angular/core";
import { IntlNumberFormattingProvider } from "../../core/services/intl-number-formatting.provider";

@Pipe({
  name: "prCurrency"
})
export class CurrencyPipe implements PipeTransform {
  constructor(private intlNumberFormattingProvider: IntlNumberFormattingProvider) {
  }

  public transform(value: number): string {
    return value && this.intlNumberFormattingProvider.formatCurrency(value);
  }
}
