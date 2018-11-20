import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { DisconnectableBehavior } from "../../../shared/disconnectable/disconnectable-behavior";
import { AppActionTypes } from "../../actions/app.actions";

@Injectable()
export class InitStateEffectFactory {

  constructor(private actions$: Actions) {
  }

  public get(disconnectableBehavior: DisconnectableBehavior): Observable<Action> {
    return this.actions$
    .pipe(
      ofType(AppActionTypes.AuthProtectedRouteActivated),
      filter(() => disconnectableBehavior.filter()),
      map(() => disconnectableBehavior.action())
    );
  }
}
