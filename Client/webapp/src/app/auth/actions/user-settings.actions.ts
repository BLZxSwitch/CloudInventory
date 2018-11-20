import { Action } from "@ngrx/store";
import { UserSettingsDTO } from "../../core/services/service-proxies";

export enum UserSettingsActionTypes {
  UserSettingsUpdate = "[User Settings] Update",
  UserSettingsUpdateSuccess = "[User Settings] Update Success",
  UserSettingsRequest = "[User Settings] User Settings Request",
  UserSettingsRequestSuccess = "[User Settings] User Settings Request Success"
}

export class UserSettingsUpdate implements Action {
  public readonly type = UserSettingsActionTypes.UserSettingsUpdate;

  constructor(public payload: {
    userSettings: UserSettingsDTO;
  }) {
  }
}

export class UserSettingsUpdateSuccess implements Action {
  public readonly type = UserSettingsActionTypes.UserSettingsUpdateSuccess;

  constructor(public payload: {
    userSettings: UserSettingsDTO;
  }) {
  }
}

export class UserSettingsRequest implements Action {
  public readonly type = UserSettingsActionTypes.UserSettingsRequest;
}

export class UserSettingsRequestSuccess implements Action {
  public readonly type = UserSettingsActionTypes.UserSettingsRequestSuccess;

  constructor(public payload: {
    userSettings: UserSettingsDTO
  }) {
  }
}

export type UserSettingsActionsUnion =
  | UserSettingsUpdate
  | UserSettingsUpdateSuccess
  | UserSettingsRequest
  | UserSettingsRequestSuccess;
