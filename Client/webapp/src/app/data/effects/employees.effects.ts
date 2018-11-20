import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, exhaustMap, map, withLatestFrom } from "rxjs/operators";
import * as fromAuth from "../../auth/reducers";
import { EmployeesServiceProxy, InvitationServiceProxy } from "../../core/services/service-proxies";
import {
  EmployeeAddAndSendInvitationSuccess,
  EmployeeAddFailure,
  EmployeeAddRequest,
  EmployeeAddSuccess,
  EmployeeDeleteFailure,
  EmployeeDeleteRequest,
  EmployeeDeleteSuccess,
  EmployeeEditFailure,
  EmployeeEditRequest,
  EmployeeEditSuccess,
  EmployeeInviteAfterAddRequest,
  EmployeesActionTypes,
  EmployeeSendInvitationFailure,
  EmployeeSendInvitationRequest,
  EmployeeSendInvitationSuccess,
  EmployeesLoad,
  EmployeesLoadFailure,
  EmployeesLoadSuccess
} from "../actions/employees.actions";
import { IDataState } from "../reducers";

@Injectable()
export class EmployeesEffects {

  @Effect()
  public employeesLoad$ = this.actions$.pipe(
    ofType<EmployeesLoad>(EmployeesActionTypes.EmployeesLoad),
    withLatestFrom(
      this.store.pipe(select(fromAuth.isAdmin)),
    ),
    exhaustMap(([{}, isAdmin]) =>
      (isAdmin ? this.employeesServiceProxy.getAll() : null)
        .pipe(
          map(employees => new EmployeesLoadSuccess({employees})),
          catchError(error => of(new EmployeesLoadFailure(error)))
        )
    ),
  );

  @Effect()
  public editEmployee$ = this.actions$.pipe(
    ofType<EmployeeEditRequest>(EmployeesActionTypes.EmployeeEditRequest),
    exhaustMap(({payload: {employee}}) =>
      this.employeesServiceProxy.update(employee)
        .pipe(
          map(result => new EmployeeEditSuccess({employee: result as any})),
          catchError(error => of(new EmployeeEditFailure(error)))
        )
    ),
  );

  @Effect()
  public addEmployee$ = this.actions$.pipe(
    ofType<EmployeeAddRequest>(EmployeesActionTypes.EmployeeAddRequest),
    exhaustMap(({payload: {employee, invite}}) =>
      this.employeesServiceProxy.add(employee)
        .pipe(
          map(result => {
            return invite ? new EmployeeInviteAfterAddRequest({employee: result}) : new EmployeeAddSuccess({employee: result});
          }),
          catchError(error => of(new EmployeeAddFailure(error)))
        )
    ),
  );

  @Effect()
  public deleteEmployee$ = this.actions$.pipe(
    ofType<EmployeeDeleteRequest>(EmployeesActionTypes.EmployeeDeleteRequest),
    exhaustMap(({payload: {employeeId}}) =>
      this.employeesServiceProxy.delete(employeeId)
        .pipe(
          map(() => new EmployeeDeleteSuccess({employeeId})),
          catchError(error => of(new EmployeeDeleteFailure(error)))
        )
    ),
  );

  @Effect()
  public sendInvitation$ = this.actions$.pipe(
    ofType<EmployeeSendInvitationRequest>(EmployeesActionTypes.EmployeeSendInvitationRequest),
    exhaustMap(({payload: {employee}}) =>
      this.invitationServiceProxy.sendInvitation(employee.id)
        .pipe(
          map(() => new EmployeeSendInvitationSuccess({employee: {...employee, isInvited: true}})),
          catchError(error => of(new EmployeeSendInvitationFailure(error)))
        )
    ),
  );

  @Effect()
  public sendInvitationAfterSave$ = this.actions$.pipe(
    ofType<EmployeeInviteAfterAddRequest>(EmployeesActionTypes.EmployeeInviteAfterAddRequest),
    exhaustMap(({payload: {employee}}) =>
      this.invitationServiceProxy.sendInvitation(employee.id)
        .pipe(
          map(() => new EmployeeAddAndSendInvitationSuccess({employee: {...employee, isInvited: true}})),
          catchError(error => of(new EmployeeSendInvitationFailure(error)))
        )
    ),
  );

  constructor(private actions$: Actions,
              private employeesServiceProxy: EmployeesServiceProxy,
              private invitationServiceProxy: InvitationServiceProxy,
              private store: Store<IDataState>) {
  }
}
