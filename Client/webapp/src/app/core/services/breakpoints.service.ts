import { Injectable } from "@angular/core";
import { fromEvent } from "rxjs/index";
import { map, startWith } from "rxjs/operators";
import { WindowProvider } from "./window-provider.provider";

@Injectable({
  providedIn: "root"
})
export class BreakpointsService {

  public resize$ = fromEvent(this.windowProvider.getInstance(), "resize").pipe(
    map(({srcElement, currentTarget}) => ((srcElement || currentTarget) as Window).innerWidth),
  );

  public isMobile$ = this.resize$.pipe(
    startWith(undefined),
    map(innerWidth => this.getIsMobile(innerWidth || this.innerWidth)),
  );

  private minTabletWidth = 768;
  private maxTabletWidth = 1024;

  private get innerWidth() {
    return this.windowProvider.getInstance().innerWidth;
  }

  constructor(private windowProvider: WindowProvider) {
  }

  public get isMobile() {
    return this.getIsMobile(this.innerWidth);
  }

  public get isTablet() {
    return this.getIsTablet(this.innerWidth);
  }

  public get isDesktop() {
    return this.getIsDesktop(this.innerWidth);
  }

  private getIsMobile(innerWidth) {
    return innerWidth < this.minTabletWidth;
  }

  private getIsTablet(innerWidth) {
    return innerWidth >= this.minTabletWidth && this.innerWidth <= this.maxTabletWidth;
  }

  private getIsDesktop(innerWidth) {
    return innerWidth > this.maxTabletWidth;
  }
}
