import { Action } from "@ngrx/store";

export enum UserSettingsPageActionTypes {
  UserSettingsUpdateSuccessShowSnack = "[User Settings Page] Update Success Show Snack",
  InvalidUserPictureShowSnack = "[User Settings Page] Invalid User Picture Show Snack",
}

export class UserSettingsUpdateSuccessShowSnack implements Action {
  public readonly type = UserSettingsPageActionTypes.UserSettingsUpdateSuccessShowSnack;
}

export class InvalidUserPictureShowSnack implements Action {
  public readonly type = UserSettingsPageActionTypes.InvalidUserPictureShowSnack;
}
