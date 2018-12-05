import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { OrgUnitRequestDTO } from "../../core/services/service-proxies";
import {
  OrgUnitAddRequest,
  OrgUnitDeleteRequest,
  OrgUnitEditRequest,
  OrgUnitsCollectionActionTypes
} from "../../data/actions/org-units.collection.actions";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { OrgUnitDialogClosed, OrgUnitsActionTypes, OrgUnitSubmit } from "../actions/org-units.actions";
import { OrgUnitDialogContainer } from "../containers/org-unit-dialog/org-unit-dialog.container";

@Injectable()
export class OrgUnitsEffects {

  @Effect()
  public upsertOrgUnit$ = this.actions$.pipe(
    ofType<OrgUnitSubmit>(OrgUnitsActionTypes.OrgUnitSubmit),
    map(value => value.payload),
    map(({orgUnit}) => {
      return new OrgUnitRequestDTO({...orgUnit, molStartDate: undefined});
    }),
    map(orgUnit => orgUnit.id
      ? new OrgUnitEditRequest({orgUnit})
      : new OrgUnitAddRequest({orgUnit})
    )
  );

  @Effect()
  public showDialogEdit$ = this.effectUtilsService.createOpenDialogEffect([OrgUnitsActionTypes.OrgUnitEdit],
    [OrgUnitsCollectionActionTypes.OrgUnitEditSuccess],
    OrgUnitDialogContainer,
    OrgUnitDialogClosed);

  @Effect()
  public showDialogAdd$ = this.effectUtilsService.createOpenDialogEffect([OrgUnitsActionTypes.OrgUnitAdd],
    [OrgUnitsCollectionActionTypes.OrgUnitAddSuccess],
    OrgUnitDialogContainer,
    OrgUnitDialogClosed);

  @Effect()
  public deleteOrgUnit$ = this.effectUtilsService.createConfirmDialogEffect(OrgUnitsActionTypes.OrgUnitDelete,
    "ORG_UNITS.FORM.CONFIRM_DELETE",
    OrgUnitDeleteRequest);

  @Effect({dispatch: false})
  public editSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(OrgUnitsCollectionActionTypes.OrgUnitEditSuccess,
    "ORG_UNITS.FORM.SAVED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public addSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(OrgUnitsCollectionActionTypes.OrgUnitAddSuccess,
    "ORG_UNITS.FORM.ADDED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public deleteSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(
    OrgUnitsCollectionActionTypes.OrgUnitDeleteSuccess,
    "ORG_UNITS.FORM.DELETE_SUCCESSFULLY");

  @Effect({dispatch: false})
  public deleteErrorSnack$ = this.effectUtilsService.createErrorSnackEffectByTranslationKey(
    OrgUnitsCollectionActionTypes.OrgUnitAddFailure,
    "ORG_UNITS.FORM.ADD_ERROR");

  constructor(private actions$: Actions,
              private effectUtilsService: EffectUtilsService) {
  }
}
