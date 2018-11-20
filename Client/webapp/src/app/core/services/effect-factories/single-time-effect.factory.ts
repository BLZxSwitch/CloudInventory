import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { DisconnectableBehaviorFactory } from "../../disconnectable/disconnectable-behavior.factory";
import { InitStateEffectFactory } from "./init-state-effect.factory";
import { LogoutEffectFactory } from "./logout-effect.factory";

@Injectable()
export class SingleTimeEffectFactory {

  constructor(
    private disconnectableBehaviorFactory: DisconnectableBehaviorFactory,
    private logoutEffectFactory: LogoutEffectFactory,
    private initStateEffectFactory: InitStateEffectFactory) {
  }

  public get(action: () => Action): Observable<Action>[] {
    const disconnectable = this.disconnectableBehaviorFactory.get(action);
    const effect$ = this.initStateEffectFactory.get(disconnectable);
    const logout$ = this.logoutEffectFactory.get(disconnectable);
    return [effect$, logout$];
  }
}
