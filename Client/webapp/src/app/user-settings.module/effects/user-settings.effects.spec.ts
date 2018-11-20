import { cold, hot } from "jasmine-marbles";
import { createInjectorWithActions, TestActions } from "../../../unit-tests.components/mocks/actions";
import { get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import {
  UserSettingsRequest,
  UserSettingsRequestSuccess,
  UserSettingsUpdate,
  UserSettingsUpdateSuccess
} from "../../auth/actions/user-settings.actions";
import { LanguageService } from "../../core/services/language.service";
import { FileParameter, UserPictureServiceProxy, UserSettingsDTO, UserSettingsServiceProxy } from "../../core/services/service-proxies";
import { UserPictureDelete, UserPictureDeleteSuccess, UserPictureUpdate, UserPictureUpdateSuccess } from "../actions/user-picture.actions";
import { UserSettingsEffects } from "./user-settings.effects";

describe("UserSettingsEffects", () => {

  let actions$: TestActions;

  beforeEach(() => {
    actions$ = createInjectorWithActions(UserSettingsEffects);
  });

  describe("updateUserSettings$", () => {
    it("should call update and return a UserSettingsEditSuccess on success", () => {
      const effects = get<UserSettingsEffects>();
      const userSettings = new UserSettingsDTO();

      const action = new UserSettingsUpdate({userSettings});
      const completion = new UserSettingsUpdateSuccess({userSettings});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: userSettings});
      const expected = cold("--c", {c: completion});

      resolve<UserSettingsServiceProxy>(UserSettingsServiceProxy)
        .setup(instance => instance.update(userSettings))
        .returns(response);

      expect(effects.updateUserSettings$).toBeObservable(expected);
    });
  });

  describe("UserSettingsRequest", () => {
    it("should call get and return a UserSettingsRequestSuccess on success", () => {
      const effects = get<UserSettingsEffects>();
      const userSettings = new UserSettingsDTO();

      const action = new UserSettingsRequest();
      const completion = new UserSettingsRequestSuccess({userSettings});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: userSettings});
      const expected = cold("--c", {c: completion});

      resolve<UserSettingsServiceProxy>(UserSettingsServiceProxy)
        .setup(instance => instance.get())
        .returns(response);

      expect(effects.UserSettingsRequest).toBeObservable(expected);
    });
  });

  describe("languageUpdateSuccess$", () => {
    it("should call setDefaultLanguage on UserSettingsUpdateSuccess", () => {
      const effects = get<UserSettingsEffects>();
      const language = "language";
      const userSettings = new UserSettingsDTO();
      userSettings.language = language;

      const action = new UserSettingsUpdateSuccess({userSettings});

      actions$.stream = hot("-a", {a: action});

      effects.languageUpdateSuccess$.subscribe(() => {
        resolve<LanguageService>(LanguageService)
          .verify(instance => instance.setDefaultLanguage(language));
      });
    });
  });

  describe("uploadUserPicture$", () => {
    it("should call uploadUserPicture and return a UserPictureUpdateSuccess on success", () => {
      const effects = get<UserSettingsEffects>();
      const userSettings = new UserSettingsDTO();
      const userPicture: FileParameter = {
        data: "data",
        fileName: "fileName",
      };
      const action = new UserPictureUpdate({userPicture});
      const completion = new UserPictureUpdateSuccess({userSettings});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: userSettings});
      const expected = cold("--c", {c: completion});

      resolve<UserPictureServiceProxy>(UserPictureServiceProxy)
        .setup(instance => instance.uploadUserPicture(userPicture))
        .returns(response);

      expect(effects.uploadUserPicture$).toBeObservable(expected);
    });
  });

  describe("deleteUserPicture$", () => {
    it("should call deleteUserPicture and return a UserPictureUpdateSuccess on success", () => {
      const effects = get<UserSettingsEffects>();
      const userSettings = new UserSettingsDTO();
      const action = new UserPictureDelete();
      const completion = new UserPictureDeleteSuccess({userSettings});

      actions$.stream = hot("-a", {a: action});
      const response = cold("-b", {b: userSettings});
      const expected = cold("--c", {c: completion});

      resolve<UserPictureServiceProxy>(UserPictureServiceProxy)
        .setup(instance => instance.deleteUserPicture())
        .returns(response);

      expect(effects.deleteUserPicture$).toBeObservable(expected);
    });
  });

  describe("uploadUserPictureSuccess$", () => {
    it("should return a UserSettingsUpdateSuccess", () => {
      const effects = get<UserSettingsEffects>();
      const userSettings = new UserSettingsDTO();
      const action = new UserPictureUpdateSuccess({userSettings});
      const completion = new UserSettingsUpdateSuccess({userSettings});

      actions$.stream = hot("-a", {a: action});
      const expected = cold("-c", {c: completion});

      expect(effects.uploadUserPictureSuccess$).toBeObservable(expected);
    });
  });

  describe("deleteUserPictureSuccess$", () => {
    it("should return a UserSettingsUpdateSuccess", () => {
      const effects = get<UserSettingsEffects>();
      const userSettings = new UserSettingsDTO();
      const action = new UserPictureDeleteSuccess({userSettings});
      const completion = new UserSettingsUpdateSuccess({userSettings});

      actions$.stream = hot("-a", {a: action});
      const expected = cold("-c", {c: completion});

      expect(effects.deleteUserPictureSuccess$).toBeObservable(expected);
    });
  });
});
