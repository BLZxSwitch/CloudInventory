import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { OrgUnitsServiceProxy } from "../../core/services/service-proxies";
import {
  OrgUnitAddFailure,
  OrgUnitAddRequest, OrgUnitAddSuccess,
  OrgUnitDeleteFailure,
  OrgUnitDeleteRequest, OrgUnitDeleteSuccess,
  OrgUnitEditFailure,
  OrgUnitEditRequest,
  OrgUnitEditSuccess,
  OrgUnitsCollectionActionTypes, OrgUnitsLoad, OrgUnitsLoadFailure, OrgUnitsLoadSuccess
} from "../actions/org-units.collection.actions";

@Injectable()
export class OrgUnitsCollectionEffects {
  @Effect()
  public orgUnitLoad$ = this.actions$.pipe(
    ofType<OrgUnitsLoad>(OrgUnitsCollectionActionTypes.OrgUnitsLoad),
    exhaustMap(() =>
      this.orgUnitsServiceProxy.getAll()
        .pipe(
          map(orgUnits => new OrgUnitsLoadSuccess({orgUnits})),
          catchError(error => of(new OrgUnitsLoadFailure(error)))
        )
    )
  );

  @Effect()
  public editOrgUnit$ = this.actions$.pipe(
    ofType<OrgUnitEditRequest>(OrgUnitsCollectionActionTypes.OrgUnitEditRequest),
    exhaustMap(({payload: {orgUnit}}) =>
      this.orgUnitsServiceProxy.update(orgUnit)
        .pipe(
          map(result => new OrgUnitEditSuccess({orgUnit: result})),
          catchError(error => of(new OrgUnitEditFailure(error)))
        )
    )
  );

  @Effect()
  public deleteOrgUnit$ = this.actions$.pipe(
    ofType<OrgUnitDeleteRequest>(OrgUnitsCollectionActionTypes.OrgUnitDeleteRequest),
    exhaustMap(({payload: {orgUnitId}}) =>
      this.orgUnitsServiceProxy.delete(orgUnitId)
        .pipe(
          map(() => new OrgUnitDeleteSuccess({orgUnitId})),
          catchError(error => of(new OrgUnitDeleteFailure(error)))
        )
    )
  );

  @Effect()
  public addOrgUnit$ = this.actions$.pipe(
    ofType<OrgUnitAddRequest>(OrgUnitsCollectionActionTypes.OrgUnitAddRequest),
    exhaustMap(({payload: {orgUnit}}) =>
      this.orgUnitsServiceProxy.addOrgUnit(orgUnit)
        .pipe(
          map(result => new OrgUnitAddSuccess({orgUnit: result})),
          catchError(error => of(new OrgUnitAddFailure(error)))
        )
    )
  );

  constructor(private actions$: Actions, private orgUnitsServiceProxy: OrgUnitsServiceProxy) {
  }
}
