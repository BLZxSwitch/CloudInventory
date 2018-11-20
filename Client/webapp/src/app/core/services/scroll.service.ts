import { Injectable } from "@angular/core";
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ScrollService {

  public scroll$ = fromEvent(window, "scroll").pipe(
    // do not emit scroll event caused by cdk scroll block strategy
    filter(() => !document.documentElement.classList.contains("cdk-global-scrollblock")),
    map(() => (document.scrollingElement || document.documentElement).scrollTop),
  );

  public isDefaultScrollPosition$ = this.scroll$.pipe(map(scrollTop => scrollTop === 0));

  public isNotDefaultScrollPosition$ = this.isDefaultScrollPosition$.pipe(map(isDefaultScrollPosition => !isDefaultScrollPosition));
}
