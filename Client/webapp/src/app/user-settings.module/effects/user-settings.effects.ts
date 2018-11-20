import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { exhaustMap, map, tap } from "rxjs/operators";
import {
  UserSettingsActionTypes, UserSettingsRequest,
  UserSettingsRequestSuccess,
  UserSettingsUpdate,
  UserSettingsUpdateSuccess
} from "../../auth/actions/user-settings.actions";
import * as fromAuth from "../../auth/reducers";
import { LanguageService } from "../../core/services/language.service";
import { UserPictureServiceProxy, UserSettingsServiceProxy } from "../../core/services/service-proxies";
import { EffectUtilsService } from "../../shared/services/effect-utils.service";
import {
  UserPictureActionTypes,
  UserPictureDelete,
  UserPictureDeleteSuccess,
  UserPictureUpdate,
  UserPictureUpdateSuccess
} from "../actions/user-picture.actions";
import { UserSettingsPageActionTypes, UserSettingsUpdateSuccessShowSnack } from "../actions/user-settings-page.actions";

@Injectable()
export class UserSettingsEffects {

  @Effect()
  public updateUserSettings$ = this.actions$.pipe(
    ofType<UserSettingsUpdate>(UserSettingsActionTypes.UserSettingsUpdate),
    map(action => action.payload),
    exhaustMap(({userSettings}) =>
      this.userSettingsServiceProxy
        .update(userSettings)
        .pipe(
          tap(() => this.store.dispatch(new UserSettingsUpdateSuccessShowSnack())),
          map(() => new UserSettingsUpdateSuccess({userSettings}))
        ),
    ),
  );

  @Effect()
  public UserSettingsRequest = this.actions$.pipe(
    ofType<UserSettingsRequest>(UserSettingsActionTypes.UserSettingsRequest),
    exhaustMap(() => {
        return this.userSettingsServiceProxy
          .get()
          .pipe(
            map(userSettings => new UserSettingsRequestSuccess({userSettings}))
          );
      }
    )
  );

  @Effect({dispatch: false})
  public languageUpdateSuccess$ = this.actions$.pipe(
    ofType<UserSettingsUpdateSuccess>(UserSettingsActionTypes.UserSettingsUpdateSuccess),
    map(action => action.payload),
    tap(({userSettings: {language}}) => {
        this.languageService.setDefaultLanguage(language);
      }
    ),
  );

  @Effect()
  public uploadUserPicture$ = this.actions$.pipe(
    ofType<UserPictureUpdate>(UserPictureActionTypes.UserPictureUpdate),
    map(action => action.payload),
    exhaustMap(({userPicture}) =>
      this.userPictureServiceProxy
        .uploadUserPicture(userPicture)
        .pipe(
          map(userSettings => new UserPictureUpdateSuccess({userSettings}))
        ),
    ),
  );

  @Effect()
  public deleteUserPicture$ = this.actions$.pipe(
    ofType<UserPictureDelete>(UserPictureActionTypes.UserPictureDelete),
    exhaustMap(() =>
      this.userPictureServiceProxy
        .deleteUserPicture()
        .pipe(
          map(userSettings => new UserPictureDeleteSuccess({userSettings}))
        ),
    ),
  );

  @Effect()
  public uploadUserPictureSuccess$ = this.actions$.pipe(
    ofType<UserPictureUpdateSuccess>(UserPictureActionTypes.UserPictureUpdateSuccess),
    map(action => action.payload),
    map(({userSettings}) => new UserSettingsUpdateSuccess({userSettings}))
  );

  @Effect()
  public deleteUserPictureSuccess$ = this.actions$.pipe(
    ofType<UserPictureDeleteSuccess>(UserPictureActionTypes.UserPictureDeleteSuccess),
    map(action => action.payload),
    map(({userSettings}) => new UserSettingsUpdateSuccess({userSettings}))
  );

  @Effect({dispatch: false})
  public editSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(
    UserSettingsPageActionTypes.UserSettingsUpdateSuccessShowSnack,
    "MY_SETTINGS.SAVED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public invalidUserPictureShowSnack$ = this.effectUtilsService.createSuccessSnackEffect(
    UserSettingsPageActionTypes.InvalidUserPictureShowSnack,
    "MY_SETTINGS.INVALID_USER_PICTURE_MESSAGE");

  @Effect({dispatch: false})
  public uploadUserPictureSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(UserPictureActionTypes.UserPictureUpdateSuccess,
    "MY_SETTINGS.USER_PICTURE_UPDATED_SUCCESSFULLY");

  @Effect({dispatch: false})
  public deleteUserPictureSuccessSnack$ = this.effectUtilsService.createSuccessSnackEffect(UserPictureActionTypes.UserPictureDeleteSuccess,
    "MY_SETTINGS.USER_PICTURE_DELETED_SUCCESSFULLY");

  constructor(private actions$: Actions,
              private store: Store<fromAuth.IState>,
              private languageService: LanguageService,
              private effectUtilsService: EffectUtilsService,
              private userSettingsServiceProxy: UserSettingsServiceProxy,
              private userPictureServiceProxy: UserPictureServiceProxy) {
  }
}
