import { SwUpdate } from "@angular/service-worker";
import { Actions } from "@ngrx/effects";
import { cold } from "jasmine-marbles";
import { Times } from "moq.ts";
import { createInjector, get, resolve } from "../../../unit-tests.components/mocks/createInjector";
import { ReloadService } from "../../core/services/reload.service";
import { ReloadApplicationAction } from "../actions/update-application.actions";
import { UpdateApplicationSnackBarService } from "../services/update-application-snack-bar.service";
import { UpdateAvailableNotificationEffects } from "./update-available-notifications.effect";

describe("Update application", () => {

  beforeEach(() => {
    createInjector(UpdateAvailableNotificationEffects);
  });

  beforeEach(() => {
    resolve<SwUpdate>(SwUpdate)
      .setup(instance => instance.available)
      .returns(cold("-a"));
  });

  it("Should be resolved", () => {
    const actual = get<UpdateAvailableNotificationEffects>();
    expect(actual).toEqual(jasmine.any(UpdateAvailableNotificationEffects));
  });

  it("Exposes update availability effect", () => {

    resolve<SwUpdate>(SwUpdate)
      .setup(instance => instance.available)
      .returns(cold("-a"));

    const effect = get<UpdateAvailableNotificationEffects>();

    expect(effect.effectOnUpdate$).toBeObservable(cold("-a", {a: undefined}));

    resolve<UpdateApplicationSnackBarService>(UpdateApplicationSnackBarService)
      .verify(instance => instance.openNotification());
  });

  it("Exposes application reload action effect", () => {

    const reloadApplicationAction = new ReloadApplicationAction();
    const actions$ = cold("-a", {a: reloadApplicationAction});

    resolve<Actions>(Actions)
      .setup(instance => instance.pipe)
      .returns(actions$.pipe.bind(actions$));

    resolve<SwUpdate>(SwUpdate)
      .setup(instance => instance.activateUpdate())
      .returns(cold("--a", {a: undefined}));

    const effect = get<UpdateAvailableNotificationEffects>();

    expect(effect.effectOnReload$).toBeObservable(cold("---a", {a: undefined}));

    resolve<SwUpdate>(SwUpdate)
      .verify(instance => instance.activateUpdate(), Times.Once());

    resolve<ReloadService>(ReloadService)
      .verify(instance => instance.reload(), Times.Once());
  });
});
