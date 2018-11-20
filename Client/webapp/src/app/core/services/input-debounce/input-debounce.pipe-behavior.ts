import { Inject, Injectable, Optional } from "@angular/core";
import { pipe, SchedulerLike } from "rxjs/index";
import { distinctUntilChanged } from "rxjs/internal/operators";
import { async } from "rxjs/internal/scheduler/async";
import { debounceTime } from "rxjs/operators";
import { UnaryFunction } from "rxjs/src/internal/types";
import { RXJS_SCHEDULER } from "../../../shared/InjectionTokens/rsjx-scheduler.injection-token";

@Injectable()
export class InputDebouncePipeBehavior {
  constructor(@Optional()
              @Inject(RXJS_SCHEDULER)
              private scheduler: SchedulerLike) {

  }

  public get(keySelector: (x: any) => any): UnaryFunction<any, any> {
    return pipe(
      debounceTime(600, this.scheduler || async),
      distinctUntilChanged(undefined, keySelector),
    );
  }
}
