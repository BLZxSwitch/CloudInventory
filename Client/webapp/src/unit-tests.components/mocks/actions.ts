import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { hot } from "jasmine-marbles";
import { EMPTY, Observable } from "rxjs";
import { createInjector } from "./createInjector";

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    /* tslint:disable */
    this.source = source;
    /* tslint:enable */
  }
}

export function getActions() {
  return new TestActions();
}

export function createInjectorWithActions(constructor: any) {
  const actions$ = getActions();

  createInjector(constructor, [
    {provide: Actions, useValue: actions$},
    ]);

  return actions$;
}

export function createInjectorWithActionsAndStore(constructor: any) {
  const actions$ = getActions();

  createInjector(constructor, [
    {provide: Actions, useValue: actions$},
    {provide: Store, useValue: hot("-z")}
  ]);

  return actions$;
}
