import { Injectable } from "@angular/core";
import { IPeriod } from "../models/period.model";
import { NowProvider } from "./now.provider";

@Injectable()
export class InitialMonthProvider {
  constructor(private nowProvider: NowProvider) {
  }

  public get(): IPeriod {
    const now = this.nowProvider.now();
    now.date(now.date() - 10);
    return {year: now.year(), month: now.month() + 1};
  }
}
