import { Inject, Injectable, Optional } from "@angular/core";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material";
import { ISO_8601, locale, localeData, Moment, utc } from "moment";
import { NowProvider } from "../services/now.provider";
import { range } from "./range";

@Injectable()
export class NumberDateAdapter extends DateAdapter<number> {
  private _localeData: {
    firstDayOfWeek: number,
    longMonths: string[],
    shortMonths: string[],
    dates: string[],
    longDaysOfWeek: string[],
    shortDaysOfWeek: string[],
    narrowDaysOfWeek: string[]
  };

  constructor(
    @Optional()
    @Inject(MAT_DATE_LOCALE)
    matDateLocale: string,
    private nowProvider: NowProvider) {
    super();
    this.setLocale(matDateLocale || locale());
  }

  public invalid(): number {
    return NaN;
  }

  public getYear(date: number): number {
    return utc(date).year();
  }

  public getMonth(date: number): number {
    return utc(date).month();
  }

  public getDate(date: number): number {
    return utc(date).date();
  }

  public getDayOfWeek(date: number): number {
    return utc(date).day();
  }

  public getMonthNames(style: "long" | "short" | "narrow"): string[] {
    return style === "long" ? this._localeData.longMonths : this._localeData.shortMonths;
  }

  public getDateNames(): string[] {
    return this._localeData.dates;
  }

  public getDayOfWeekNames(style: "long" | "short" | "narrow"): string[] {
    if (style === "long") {
      return this._localeData.longDaysOfWeek;
    }
    if (style === "short") {
      return this._localeData.shortDaysOfWeek;
    }
    return this._localeData.narrowDaysOfWeek;
  }

  public getYearName(date: number): string {
    return utc(date).format("YYYY");
  }

  public getFirstDayOfWeek(): number {
    return this._localeData.firstDayOfWeek;
  }

  public getNumDaysInMonth(date: number): number {
    return utc(date).daysInMonth();
  }

  public clone(date: number): number {
    return date;
  }

  public createDate(year: number, month: number, date: number): number {
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this._createMoment({year, month, date}).locale(this.locale);

    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result.valueOf();
  }

  public today(): number {
    return this.nowProvider.now().valueOf();
  }

  public parse(value: any, parseFormat: string | string[]): number | null {
    if (value && typeof value === "string") {
      return this._createMoment(value, parseFormat, this.locale).valueOf();
    }
    return value ? this._createMoment(value).locale(this.locale).valueOf() : null;
  }

  public format(date: number, displayFormat: any): string {
    return utc(date).locale(this.locale).format(displayFormat);
  }

  public addCalendarYears(date: number, years: number): number {
    return utc(date).add({years}).valueOf();
  }

  public addCalendarMonths(date: number, months: number): number {
    return utc(date).add({months}).valueOf();
  }

  public addCalendarDays(date: number, days: number): number {
    return utc(date).add({days}).valueOf();
  }

  public toIso8601(date: number): string {
    return utc(date).locale(this.locale).format();
  }

  public isDateInstance(obj: any): boolean {
    return typeof obj === "number";
  }

  public isValid(date: number): boolean {
    return !isNaN(date);
  }

  public setLocale(value: string): void {
    super.setLocale(value);

    const momentLocaleData = localeData(value);
    const dates = range(31, i => utc([2017, 0, i + 1]).locale(this.locale).format("D"));
    this._localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      longMonths: momentLocaleData.months(),
      shortMonths: momentLocaleData.monthsShort(),
      dates,
      longDaysOfWeek: momentLocaleData.weekdays(),
      shortDaysOfWeek: momentLocaleData.weekdaysShort(),
      narrowDaysOfWeek: momentLocaleData.weekdaysMin()
    };
  }

  public deserialize(value: any): number | null {
    let date;
    if (value instanceof Date) {
      date = this._createMoment(value);
    }
    if (typeof value === "string") {
      if (!value) {
        return null;
      }
      date = this._createMoment(value, ISO_8601).locale(this.locale);
    }
    if (date && date.isValid()) {
      return date.valueOf();
    }
    return super.deserialize(value);
  }

  private _createMoment(...args: any[]): Moment {
    return utc(...args);
  }
}
