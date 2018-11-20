import { Injectable } from "@angular/core";
import { Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import { EmployeesLoad } from "../../data/actions/employees.actions";
import { SingleTimeEffectFactory } from "../services/effect-factories/single-time-effect.factory";

@Injectable()
export class InitEmployeesStateEffect {

  @Effect()
  public effect$: Observable<any>;

  @Effect({dispatch: false})
  public logout$: Observable<any>;

  constructor(singleTimeEffectFactory: SingleTimeEffectFactory) {

    [this.effect$, this.logout$] = singleTimeEffectFactory.get(
      () => new EmployeesLoad()
    );
  }
}
