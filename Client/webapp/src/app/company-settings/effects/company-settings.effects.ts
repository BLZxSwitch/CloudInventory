import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs/index";
import { catchError, exhaustMap, map } from "rxjs/operators";
import {
  TenantSettingsServiceProxy,
} from "../../core/services/service-proxies";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import {
  CompanySettingsActionTypes, CompanySettingsEditFailure, CompanySettingsEditRequest, CompanySettingsEditSuccess,
  CompanySettingsLoad, CompanySettingsLoadFailure, CompanySettingsLoadSuccess,
} from "../actions/company-settings.actions";

@Injectable()
export class CompanySettingsEffects {

  @Effect()
  public tenantSettingsLoad$ = this.actions$.pipe(
    ofType<CompanySettingsLoad>(CompanySettingsActionTypes.CompanySettingsLoad),
    exhaustMap(() =>
      this.tenantSettingsServiceProxy.get()
        .pipe(
          map(tenantSettings => new CompanySettingsLoadSuccess({tenantSettings})),
          catchError(error => of(new CompanySettingsLoadFailure(error)))
        )
    ),
  );

  @Effect()
  public editTenantSettings$ = this.actions$.pipe(
    ofType<CompanySettingsEditRequest>(CompanySettingsActionTypes.CompanySettingsEditRequest),
    map(({payload}) => payload),
    exhaustMap(({tenantSettings}) =>
      this.tenantSettingsServiceProxy.update(tenantSettings)
        .pipe(
          map(result => new CompanySettingsEditSuccess({tenantSettings: result})),
          catchError(error => of(new CompanySettingsEditFailure(error)))
        )
    ),
  );

  @Effect({dispatch: false})
  public editSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(CompanySettingsActionTypes.CompanySettingsEditSuccess,
    "COMPANY_SETTINGS.SAVED_SUCCESSFULLY");

  constructor(private actions$: Actions,
              private effectUtilsService: EffectUtilsService,
              private tenantSettingsServiceProxy: TenantSettingsServiceProxy) {
  }
}
