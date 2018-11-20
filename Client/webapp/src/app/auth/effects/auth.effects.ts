import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthService } from "ng2-ui-auth";
import { of } from "rxjs";
import { NEVER } from "rxjs/internal/observable/never";
import { catchError, exhaustMap, first, map, switchMap, tap } from "rxjs/operators";
import { AppActionTypes, AuthProtectedRouteActivated } from "../../core/actions/app.actions";
import { RoutesService } from "../../core/services/routes.service";
import {
  AuthServiceProxy,
  ForgotPasswordRequest,
  ISignInRequest,
  OtpSignInRequest,
  ResetPasswordRequest,
  SetPasswordRequest,
  UserServiceProxy
} from "../../core/services/service-proxies";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import * as fromAuth from "../actions/auth.actions";
import { AuthActionTypes, MeRequestSuccess } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

  @Effect()
  public meRequest$ = this.actions$.pipe(
    ofType<AuthProtectedRouteActivated>(AppActionTypes.AuthProtectedRouteActivated),
    first(),
    switchMap(() => this.userServiceProxy
      .me()
      .pipe(
        map(user => new MeRequestSuccess({user})),
        catchError(() => NEVER)
      )
    ),
  );

  @Effect()
  public login$ = this.actions$.pipe(
    ofType<fromAuth.Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: ISignInRequest) =>
      this.authService
        .login(auth)
        .pipe(
          map(({user}) => new fromAuth.LoginSuccess({user})),
          catchError(error => of(new fromAuth.LoginFailure(error)))
        )
    )
  );

  @Effect()
  public otpLogin$ = this.actions$.pipe(
    ofType<fromAuth.OtpLogin>(AuthActionTypes.OtpLogin),
    map(action => action.payload),
    exhaustMap((auth: OtpSignInRequest) =>
      this.authServiceProxy
        .otpSignIn(auth)
        .pipe(
          tap(({token}) => this.authService.setToken(token)),
          map(({user}) => new fromAuth.LoginSuccess({user})),
          catchError(error => of(new fromAuth.LoginFailure(error)))
        )
    )
  );

  @Effect({dispatch: false})
  public otpRequest$ = this.actions$.pipe(
    ofType<fromAuth.OtpRedirect>(AuthActionTypes.OtpRedirect),
    tap(() => {
      this.router.navigate(this.routesService.authOtpEnterCode());
    })
  );

  @Effect()
  public forgotPasswordRequest$ = this.actions$.pipe(
    ofType<fromAuth.ForgotPasswordRequest>(AuthActionTypes.ForgotPasswordRequest),
    map(action => action.payload),
    exhaustMap((request: ForgotPasswordRequest) =>
      this.authServiceProxy
        .forgotPassword(request)
        .pipe(
          map(() => new fromAuth.ForgotPasswordSuccess()),
          catchError(error => of(new fromAuth.ForgotPasswordFailure(error)))
        )
    )
  );

  @Effect({dispatch: false})
  public forgotPasswordSuccess$ = this.actions$.pipe(
    ofType<fromAuth.ForgotPasswordSuccess>(AuthActionTypes.ForgotPasswordSuccess),
    tap(() => {
      this.router.navigate(this.routesService.authForgotPasswordSuccess());
    })
  );

  @Effect()
  public resetPasswordRequest$ = this.actions$.pipe(
    ofType<fromAuth.ResetPasswordRequest>(AuthActionTypes.ResetPasswordRequest),
    map(action => action.payload),
    exhaustMap(({code, password, userId}) => this.authServiceProxy
      .resetPassword(new ResetPasswordRequest({code, password, userId}))
      .pipe(
        map(({user, token}) => new fromAuth.ResetPasswordSuccess({user, token})),
        catchError(error => of(new fromAuth.ResetPasswordFailure(error)))
      )
    )
  );

  @Effect()
  public setPasswordRequest$ = this.actions$.pipe(
    ofType<fromAuth.SetPasswordRequest>(AuthActionTypes.SetPasswordRequest),
    map(action => action.payload),
    exhaustMap(({code, password, userId, toSAccepted}) => this.authServiceProxy
      .setPassword(new SetPasswordRequest({code, password, userId, toSAccepted}))
      .pipe(
        map(({user, token}) => new fromAuth.SetPasswordSuccess({user, token})),
        catchError(error => of(new fromAuth.SetPasswordFailure(error)))
      )
    )
  );

  @Effect()
  public changePasswordSuccess$ = this.actions$.pipe(
    ofType<fromAuth.ResetPasswordSuccess | fromAuth.SetPasswordSuccess>(AuthActionTypes.ResetPasswordSuccess,
      AuthActionTypes.SetPasswordSuccess),
    map(action => action.payload),
    tap(({token}) => this.authService.setToken(token)),
    map(({user}) => new fromAuth.LoginSuccess({user}))
  );

  @Effect({dispatch: false})
  public resetPasswordSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(AuthActionTypes.ResetPasswordSuccess,
    `AUTH.RESET_PASSWORD.SUCCESS_MESSAGE`,
    3000);

  @Effect({dispatch: false})
  public setPasswordSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(AuthActionTypes.SetPasswordSuccess,
    `AUTH.SET_PASSWORD.SUCCESS_MESSAGE`,
    3000);

  @Effect({dispatch: false})
  public loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    tap(() => this.router.navigate(["/"]))
  );

  @Effect({dispatch: false})
  public logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    switchMap(() => this.authService.logout())
  );

  @Effect({dispatch: false})
  public loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(() => {
      this.router.navigate(this.routesService.authLogin());
    })
  );

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private routesService: RoutesService,
              private effectUtilsService: EffectUtilsService,
              private userServiceProxy: UserServiceProxy,
              private authServiceProxy: AuthServiceProxy) {
  }
}
