import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { AuthActionTypes } from "../../../auth/actions/auth.actions";
import { DisconnectableBehavior } from "../../../shared/disconnectable/disconnectable-behavior";

@Injectable()
export class LogoutEffectFactory {

  constructor(private actions$: Actions) {
  }

  public get(disconnectableBehavior: DisconnectableBehavior) {
    return this.actions$
    .pipe(
      ofType(AuthActionTypes.Logout),
      map(() => disconnectableBehavior.reset()),
      map(() => undefined)
    );
  }
}
