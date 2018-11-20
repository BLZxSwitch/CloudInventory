import { Injectable } from "@angular/core";
import { ActivationEnd, Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ROUTER_NAVIGATION } from "@ngrx/router-store";
import { Store } from "@ngrx/store";
import { delay, filter, map, switchMap } from "rxjs/operators";

@Injectable()
export class OpenAddDialogEffect {

  @Effect()
  public logout$ = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    switchMap(() =>
      this.router
        .events
        .pipe(
          filter(event => event instanceof ActivationEnd),
          map(event => event["snapshot"].data),
          filter(({addEntityAction}) => !!addEntityAction),
          map(({addEntityAction}) =>  new addEntityAction()),
        )
    )
  );

  constructor(private router: Router,
              private store: Store<any>,
              private actions$: Actions) {

  }
}
