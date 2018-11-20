import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import {
  EmployeeAddRequest,
  EmployeeDeleteRequest,
  EmployeeEditRequest,
  EmployeesActionTypes,
  EmployeeSendInvitationRequest
} from "../../data/actions/employees.actions";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import { EmployeeDialogClosed, EmployeeSubmit, StaffActionTypes } from "../actions/staff.actions";
import { EmployeeInfoDialogComponent } from "../containers/employee-info-dialog/employee-info-dialog.component";

@Injectable()
export class StaffEffects {

  @Effect()
  public upsertEmployee$ = this.actions$.pipe(
    ofType<EmployeeSubmit>(StaffActionTypes.EmployeeSubmit),
    map(({payload: {employee, invite}}) =>
      employee.id
        ? new EmployeeEditRequest({employee})
        : new EmployeeAddRequest({employee, invite})
    )
  );

  @Effect()
  public showDialogEdit$ = this.effectUtilsService.createOpenDialogEffect([StaffActionTypes.EmployeeEdit],
    [EmployeesActionTypes.EmployeeEditSuccess],
    EmployeeInfoDialogComponent,
    EmployeeDialogClosed);

  @Effect()
  public showDialogAdd$ = this.effectUtilsService.createOpenDialogEffect([StaffActionTypes.EmployeeAdd],
    [EmployeesActionTypes.EmployeeAddSuccess, EmployeesActionTypes.EmployeeAddAndSendInvitationSuccess],
    EmployeeInfoDialogComponent,
    EmployeeDialogClosed);

  @Effect()
  public deleteEmployee$ = this.effectUtilsService.createConfirmDialogEffect(StaffActionTypes.EmployeeDelete,
    "STAFF.EMPLOYEES_LIST.CONFIRM_DELETE",
    EmployeeDeleteRequest);

  @Effect()
  public invitationEmployee$ = this.effectUtilsService.createConfirmDialogEffect(StaffActionTypes.EmployeeSendInvitation,
    ({employee: {fullName}}) => ["STAFF.EMPLOYEES_LIST.INVITED_CONFIRM", {employeeFullName: fullName}],
    EmployeeSendInvitationRequest);

  @Effect({dispatch: false})
  public editSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(EmployeesActionTypes.EmployeeEditSuccess,
    "STAFF.EMPLOYEES_LIST.SAVED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public addSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(EmployeesActionTypes.EmployeeAddSuccess,
    "STAFF.EMPLOYEES_LIST.ADDED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public sendInvitationSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(EmployeesActionTypes.EmployeeSendInvitationSuccess,
    "STAFF.EMPLOYEES_LIST.INVITED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public saveAndSendInvitationSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(
    EmployeesActionTypes.EmployeeAddAndSendInvitationSuccess,
    "STAFF.EMPLOYEES_LIST.ADDED_AND_INVITED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public deleteSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(EmployeesActionTypes.EmployeeDeleteSuccess,
    "STAFF.EMPLOYEES_LIST.DELETED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public deleteFailedSnack$ = this.effectUtilsService.createErrorSnackEffect(EmployeesActionTypes.EmployeeDeleteFailure);

  constructor(private actions$: Actions, private effectUtilsService: EffectUtilsService) {
  }
}
