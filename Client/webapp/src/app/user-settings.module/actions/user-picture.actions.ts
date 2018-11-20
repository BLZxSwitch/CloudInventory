import { Action } from "@ngrx/store";
import { FileParameter, UserSettingsDTO } from "../../core/services/service-proxies";

export enum UserPictureActionTypes {
  UserPictureUpdate = "[UserPicture] Update",
  UserPictureUpdateSuccess = "[UserPicture] Update Success",
  UserPictureDelete = "[UserPicture] Delete",
  UserPictureDeleteSuccess = "[UserPicture] Delete Success",
}

export class UserPictureUpdate implements Action {
  public readonly type = UserPictureActionTypes.UserPictureUpdate;

  constructor(public payload: { userPicture: FileParameter }) {
  }
}

export class UserPictureUpdateSuccess implements Action {
  public readonly type = UserPictureActionTypes.UserPictureUpdateSuccess;

  constructor(public payload: { userSettings: UserSettingsDTO }) {
  }
}

export class UserPictureDelete implements Action {
  public readonly type = UserPictureActionTypes.UserPictureDelete;
}

export class UserPictureDeleteSuccess implements Action {
  public readonly type = UserPictureActionTypes.UserPictureDeleteSuccess;

  constructor(public payload: { userSettings: UserSettingsDTO }) {
  }
}
