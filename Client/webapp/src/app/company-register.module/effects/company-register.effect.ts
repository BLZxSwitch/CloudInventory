import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { exhaustMap, filter, map } from "rxjs/operators";
import { CompanyRegisterAction } from "../actions/company-register.action";
import { CompanyRegisterService } from "../services/company-register.service";

@Injectable()
export class CompanyRegisterEffect {

  @Effect()
  public effect$ = this.actions$.pipe(
    filter(action => action instanceof CompanyRegisterAction),
    map(action => (action as CompanyRegisterAction).payload),
    exhaustMap(model => this.companyRegisterService.register(model))
  );

  constructor(private actions$: Actions,
              private companyRegisterService: CompanyRegisterService) {

  }
}
