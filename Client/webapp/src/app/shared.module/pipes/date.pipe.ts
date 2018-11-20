import { Pipe, PipeTransform } from "@angular/core";
import { utc } from "moment";
import { IntlDateFormattingProvider } from "../../core/services/intl-date-formatting.provider";

@Pipe({
  name: "prDate"
})
export class DatePipe implements PipeTransform {
  constructor(private intlDateFormattingProvider: IntlDateFormattingProvider) {
  }

  public transform(value: number | string): string {
    return this.intlDateFormattingProvider.format(utc(value));
  }
}
