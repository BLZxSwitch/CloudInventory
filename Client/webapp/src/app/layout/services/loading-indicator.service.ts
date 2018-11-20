import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";
import {
  selectLoadingIndicatorCount,
  selectLoadingIndicatorIsVisible
} from "../selectors/loading-indicator.selector";
import { ILoadingIndicatorStore } from "../store/loading-indicator.store";

@Injectable()
export class LoadingIndicatorService {

  constructor(private store: Store<ILoadingIndicatorStore>) {
  }

  public isLoading(): Observable<boolean> {
    return this.store
      .pipe(
        select(selectLoadingIndicatorCount),
        map(count => count > 0)
      );
  }

  public isVisible(): Observable<boolean> {
    return this.store
      .pipe(
        delay(0),
        select(selectLoadingIndicatorIsVisible),
      );
  }
}
